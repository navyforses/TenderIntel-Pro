#!/bin/bash

# TenderIntel Pro Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
PROJECT_NAME="tenderintel-pro"

echo "🚀 Deploying TenderIntel Pro to $ENVIRONMENT environment..."

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    export $(cat .env.$ENVIRONMENT | xargs)
    echo "✅ Loaded environment variables from .env.$ENVIRONMENT"
else
    echo "⚠️  Warning: .env.$ENVIRONMENT file not found"
fi

# Build and deploy based on environment
case $ENVIRONMENT in
    "development"|"dev")
        echo "🔧 Starting development environment..."
        docker-compose -f docker-compose.dev.yml down
        docker-compose -f docker-compose.dev.yml up --build -d
        echo "✅ Development environment is running at http://localhost:3000"
        ;;
    
    "staging")
        echo "🔧 Deploying to staging environment..."
        docker-compose -f docker-compose.yml -f docker-compose.staging.yml down
        docker-compose -f docker-compose.yml -f docker-compose.staging.yml up --build -d
        echo "✅ Staging environment deployed"
        ;;
    
    "production"|"prod")
        echo "🔧 Deploying to production environment..."
        
        # Create backup
        echo "📦 Creating database backup..."
        docker-compose exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DATABASE > "backup_$(date +%Y%m%d_%H%M%S).sql"
        
        # Deploy with zero downtime
        docker-compose pull
        docker-compose up --build -d --no-deps app
        
        # Run database migrations if needed
        echo "🗄️  Running database migrations..."
        # Add migration commands here if using a migration tool
        
        echo "✅ Production deployment completed"
        ;;
    
    *)
        echo "❌ Unknown environment: $ENVIRONMENT"
        echo "Available environments: development, staging, production"
        exit 1
        ;;
esac

# Health check
echo "🏥 Performing health check..."
sleep 10

if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
