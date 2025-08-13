-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenders_updated_at BEFORE UPDATE ON tenders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate tender opportunity score based on various factors
CREATE OR REPLACE FUNCTION calculate_opportunity_score(
  tender_value DECIMAL,
  days_until_deadline INTEGER,
  category_competition_level INTEGER DEFAULT 50
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 50; -- base score
BEGIN
  -- Adjust score based on tender value (higher value = higher opportunity)
  IF tender_value > 1000000 THEN
    score := score + 20;
  ELSIF tender_value > 100000 THEN
    score := score + 10;
  ELSIF tender_value < 10000 THEN
    score := score - 10;
  END IF;
  
  -- Adjust score based on time remaining (more time = better opportunity)
  IF days_until_deadline > 30 THEN
    score := score + 15;
  ELSIF days_until_deadline > 14 THEN
    score := score + 10;
  ELSIF days_until_deadline < 7 THEN
    score := score - 15;
  END IF;
  
  -- Adjust based on category competition (lower competition = higher opportunity)
  score := score + (100 - category_competition_level) / 5;
  
  -- Ensure score is within bounds
  IF score > 100 THEN score := 100; END IF;
  IF score < 0 THEN score := 0; END IF;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate risk score based on tender characteristics
CREATE OR REPLACE FUNCTION calculate_risk_score(
  tender_value DECIMAL,
  procuring_entity_type VARCHAR,
  tender_type VARCHAR,
  days_until_deadline INTEGER
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 30; -- base low risk score
BEGIN
  -- Higher value tenders have higher risk
  IF tender_value > 5000000 THEN
    score := score + 25;
  ELSIF tender_value > 1000000 THEN
    score := score + 15;
  END IF;
  
  -- Government entities might have more complex procedures
  IF procuring_entity_type = 'სახელმწიფო' THEN
    score := score + 10;
  END IF;
  
  -- Restricted tenders have higher risk
  IF tender_type = 'შეზღუდული' THEN
    score := score + 20;
  END IF;
  
  -- Very tight deadlines increase risk
  IF days_until_deadline < 7 THEN
    score := score + 15;
  END IF;
  
  -- Ensure score is within bounds
  IF score > 100 THEN score := 100; END IF;
  IF score < 0 THEN score := 0; END IF;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Create a view for active tenders with calculated scores and urgency
CREATE OR REPLACE VIEW active_tenders_view AS
SELECT 
  t.*,
  c.name_ka as category_name,
  comp.name_ka as procuring_entity_name,
  EXTRACT(DAYS FROM (t.submission_deadline - NOW())) as days_remaining,
  CASE 
    WHEN EXTRACT(DAYS FROM (t.submission_deadline - NOW())) <= 3 THEN 'მაღალი'
    WHEN EXTRACT(DAYS FROM (t.submission_deadline - NOW())) <= 7 THEN 'საშუალო'
    ELSE 'დაბალი'
  END as urgency_level,
  calculate_opportunity_score(
    t.estimated_value::DECIMAL, 
    EXTRACT(DAYS FROM (t.submission_deadline - NOW()))::INTEGER
  ) as calculated_opportunity_score,
  calculate_risk_score(
    t.estimated_value::DECIMAL,
    comp.company_type,
    t.tender_type,
    EXTRACT(DAYS FROM (t.submission_deadline - NOW()))::INTEGER
  ) as calculated_risk_score
FROM tenders t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN companies comp ON t.procuring_entity_id = comp.id
WHERE t.status = 'active' 
  AND t.submission_deadline > NOW();

-- Function to generate daily analytics
CREATE OR REPLACE FUNCTION generate_daily_analytics()
RETURNS VOID AS $$
BEGIN
  -- Update total tenders count
  INSERT INTO analytics_data (metric_name, metric_value, metric_date, additional_data)
  VALUES ('total_tenders', (SELECT COUNT(*) FROM tenders), CURRENT_DATE, '{"auto_generated": true}')
  ON CONFLICT (metric_name, metric_date) DO UPDATE SET 
    metric_value = EXCLUDED.metric_value,
    additional_data = EXCLUDED.additional_data;
  
  -- Update active tenders count
  INSERT INTO analytics_data (metric_name, metric_value, metric_date, additional_data)
  VALUES ('active_tenders', (SELECT COUNT(*) FROM tenders WHERE status = 'active'), CURRENT_DATE, '{"auto_generated": true}')
  ON CONFLICT (metric_name, metric_date) DO UPDATE SET 
    metric_value = EXCLUDED.metric_value;
  
  -- Update total estimated value
  INSERT INTO analytics_data (metric_name, metric_value, metric_date, additional_data)
  VALUES ('total_value', (SELECT COALESCE(SUM(estimated_value), 0) FROM tenders WHERE status = 'active'), CURRENT_DATE, '{"auto_generated": true, "currency": "GEL"}')
  ON CONFLICT (metric_name, metric_date) DO UPDATE SET 
    metric_value = EXCLUDED.metric_value;
END;
$$ LANGUAGE plpgsql;
