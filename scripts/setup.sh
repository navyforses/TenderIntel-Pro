#!/bin/bash

# TenderIntel Pro Setup Script
# This script sets up the development environment

set -e

echo "🔧 Setting up TenderIntel Pro development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f ".env.development" ]; then
    echo "📝 Creating development environment file..."
    cat > .env.development << EOL
# Development Environment Variables
NODE_ENV=development

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SUPABASE_JWT_SECRET=your_supabase_jwt_secret_here

# Database Configuration
POSTGRES_URL=postgresql://dev_user:dev_password@localhost:5433/tenderintel_dev
POSTGRES_PRISMA_URL=postgresql://dev_user:dev_password@localhost:5433/tenderintel_dev?pgbouncer=true&connect_timeout=15
POSTGRES_URL_NON_POOLING=postgresql://dev_user:dev_password@localhost:5433/tenderintel_dev
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_HOST=localhost
POSTGRES_DATABASE=tenderintel_dev

# Development specific
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
EOL
    echo "✅ Created .env.development file"
    echo "⚠️  Please update the environment variables with your actual values"
fi

# Create SSL directory for nginx
mkdir -p ssl

# Generate self-signed SSL certificate for development
if [ ! -f "ssl/tenderintel.crt" ]; then
    echo "🔐 Generating self-signed SSL certificate for development..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/tenderintel.key \
        -out ssl/tenderintel.crt \
        -subj "/C=GE/ST=Tbilisi/L=Tbilisi/O=TenderIntel/CN=localhost"
    echo "✅ SSL certificate generated"
fi

# Make scripts executable
chmod +x scripts/*.sh

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo "✅ Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env.development with your actual environment variables"
echo "2. Run 'npm run dev' for development server"
echo "3. Run './scripts/deploy.sh development' for Docker development environment"
echo "4. Visit http://localhost:3000 to access the application"
