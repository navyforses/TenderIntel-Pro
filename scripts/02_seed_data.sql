-- Insert default categories (in Georgian)
INSERT INTO categories (name_ka, name_en, description_ka) VALUES
('მშენებლობა', 'Construction', 'სამშენებლო სამუშაოები და ინფრასტრუქტურა'),
('IT სერვისები', 'IT Services', 'ინფორმაციული ტექნოლოგიები და პროგრამული უზრუნველყოფა'),
('კონსულტაციები', 'Consulting', 'კონსულტაციური და პროფესიული სერვისები'),
('მედიცინა', 'Healthcare', 'სამედიცინო მომსახურება და აღჭურვილობა'),
('განათლება', 'Education', 'საგანმანათლებლო სერვისები და რესურსები'),
('ტრანსპორტი', 'Transportation', 'ტრანსპორტირება და ლოგისტიკა'),
('ენერგეტიკა', 'Energy', 'ენერგეტიკული პროექტები და სერვისები'),
('გარემოს დაცვა', 'Environment', 'ეკოლოგიური და გარემოსდაცვითი პროექტები'),
('უსაფრთხოება', 'Security', 'უსაფრთხოების სისტემები და სერვისები'),
('კვება', 'Food Services', 'კვების მომსახურება და პროდუქტები');

-- Insert sample government entities
INSERT INTO companies (name_ka, name_en, company_type, contact_email) VALUES
('თბილისის მერია', 'Tbilisi City Hall', 'სახელმწიფო', 'info@tbilisi.gov.ge'),
('საქართველოს განათლების სამინისტრო', 'Ministry of Education of Georgia', 'სახელმწიფო', 'info@mes.gov.ge'),
('საქართველოს ჯანდაცვის სამინისტრო', 'Ministry of Health of Georgia', 'სახელმწიფო', 'info@moh.gov.ge'),
('საქართველოს ეკონომიკის სამინისტრო', 'Ministry of Economy of Georgia', 'სახელმწიფო', 'info@economy.ge'),
('საქართველოს ინფრასტრუქტურის სამინისტრო', 'Ministry of Infrastructure of Georgia', 'სახელმწიფო', 'info@moia.gov.ge');

-- Insert sample analytics data for dashboard
INSERT INTO analytics_data (metric_name, metric_value, metric_date, additional_data) VALUES
('total_tenders', 0, CURRENT_DATE, '{"description": "Total number of tenders"}'),
('active_tenders', 0, CURRENT_DATE, '{"description": "Currently active tenders"}'),
('total_value', 0, CURRENT_DATE, '{"description": "Total estimated value of all tenders", "currency": "GEL"}'),
('avg_opportunity_score', 0, CURRENT_DATE, '{"description": "Average opportunity score"}'),
('categories_count', 10, CURRENT_DATE, '{"description": "Number of tender categories"}');

-- Insert default user settings template
-- This will be used when creating new users
INSERT INTO user_settings (user_id, language, timezone, items_per_page, email_notifications, tender_alerts, weekly_digest)
SELECT 
  gen_random_uuid(), -- placeholder, will be updated when actual users are created
  'ka',
  'Asia/Tbilisi', 
  20,
  true,
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM user_settings LIMIT 1);

-- Insert sample user for testing (owner account)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('owner@local', '$2b$10$dummy.hash.for.testing', 'მფლობელი', 'owner')
ON CONFLICT (email) DO NOTHING;
