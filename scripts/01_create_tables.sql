-- Create Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'owner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Categories table for tender categorization
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ka VARCHAR(255) NOT NULL, -- Georgian name
  name_en VARCHAR(255), -- English name for reference
  description_ka TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ka VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  tax_number VARCHAR(50) UNIQUE,
  registration_number VARCHAR(50),
  address_ka TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  website VARCHAR(255),
  company_type VARCHAR(100), -- სახელმწიფო, კერძო, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Tenders table
CREATE TABLE IF NOT EXISTS tenders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tender_number VARCHAR(100) UNIQUE NOT NULL,
  title_ka VARCHAR(500) NOT NULL,
  title_en VARCHAR(500),
  description_ka TEXT,
  description_en TEXT,
  
  -- Procurement details
  procuring_entity_id UUID REFERENCES companies(id),
  category_id UUID REFERENCES categories(id),
  tender_type VARCHAR(100), -- ღია, შეზღუდული, etc.
  procurement_method VARCHAR(100),
  
  -- Financial information
  estimated_value DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'GEL',
  
  -- Dates
  publication_date TIMESTAMP WITH TIME ZONE,
  submission_deadline TIMESTAMP WITH TIME ZONE,
  opening_date TIMESTAMP WITH TIME ZONE,
  contract_start_date TIMESTAMP WITH TIME ZONE,
  contract_end_date TIMESTAMP WITH TIME ZONE,
  
  -- Status and metadata
  status VARCHAR(50) DEFAULT 'active', -- active, closed, cancelled, awarded
  source_url VARCHAR(500),
  source_platform VARCHAR(100), -- spa.ge, tenders.procurement.gov.ge, etc.
  
  -- AI analysis fields
  ai_summary_ka TEXT,
  ai_summary_en TEXT,
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  opportunity_score INTEGER CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Tender Documents table
CREATE TABLE IF NOT EXISTS tender_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tender_id UUID REFERENCES tenders(id) ON DELETE CASCADE,
  document_name_ka VARCHAR(255) NOT NULL,
  document_name_en VARCHAR(255),
  document_type VARCHAR(100), -- specification, contract, amendment, etc.
  file_path VARCHAR(500),
  file_size BIGINT,
  file_type VARCHAR(50),
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- AI analysis of document
  ai_extracted_text TEXT,
  ai_summary_ka TEXT,
  ai_key_requirements JSONB, -- structured requirements extracted by AI
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Analytics Data table for tracking metrics
CREATE TABLE IF NOT EXISTS analytics_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2),
  metric_date DATE NOT NULL,
  category_id UUID REFERENCES categories(id),
  tender_id UUID REFERENCES tenders(id),
  additional_data JSONB, -- flexible field for extra metrics
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ka VARCHAR(255) NOT NULL,
  title_en VARCHAR(255),
  report_type VARCHAR(100), -- monthly, quarterly, custom, etc.
  description_ka TEXT,
  
  -- Report parameters
  date_from DATE,
  date_to DATE,
  categories JSONB, -- array of category IDs
  filters JSONB, -- additional filters applied
  
  -- Generated content
  content_ka TEXT, -- AI-generated report content in Georgian
  charts_data JSONB, -- data for charts and visualizations
  
  -- Metadata
  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create User Settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification preferences
  email_notifications BOOLEAN DEFAULT true,
  tender_alerts BOOLEAN DEFAULT true,
  weekly_digest BOOLEAN DEFAULT true,
  
  -- Display preferences
  language VARCHAR(10) DEFAULT 'ka', -- ka for Georgian, en for English
  timezone VARCHAR(50) DEFAULT 'Asia/Tbilisi',
  items_per_page INTEGER DEFAULT 20,
  
  -- Alert criteria
  alert_categories JSONB, -- array of category IDs to monitor
  min_tender_value DECIMAL(15,2),
  max_tender_value DECIMAL(15,2),
  keywords_ka TEXT[], -- array of Georgian keywords
  keywords_en TEXT[], -- array of English keywords
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tenders_status ON tenders(status);
CREATE INDEX IF NOT EXISTS idx_tenders_publication_date ON tenders(publication_date);
CREATE INDEX IF NOT EXISTS idx_tenders_category ON tenders(category_id);
CREATE INDEX IF NOT EXISTS idx_tenders_procuring_entity ON tenders(procuring_entity_id);
CREATE INDEX IF NOT EXISTS idx_tender_documents_tender_id ON tender_documents(tender_id);
CREATE INDEX IF NOT EXISTS idx_analytics_data_date ON analytics_data(metric_date);
CREATE INDEX IF NOT EXISTS idx_analytics_data_metric ON analytics_data(metric_name);

-- Add full-text search indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_tenders_title_ka_fts ON tenders USING gin(to_tsvector('georgian', title_ka));
CREATE INDEX IF NOT EXISTS idx_tenders_description_ka_fts ON tenders USING gin(to_tsvector('georgian', description_ka));
CREATE INDEX IF NOT EXISTS idx_companies_name_ka_fts ON companies USING gin(to_tsvector('georgian', name_ka));

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_tenders_status_date ON tenders(status, publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_tenders_category_value ON tenders(category_id, estimated_value DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_metric_date ON analytics_data(metric_name, metric_date DESC);

-- Add partial indexes for active tenders (most common queries)
CREATE INDEX IF NOT EXISTS idx_active_tenders ON tenders(publication_date DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_upcoming_deadlines ON tenders(submission_deadline) WHERE status = 'active' AND submission_deadline > NOW();
