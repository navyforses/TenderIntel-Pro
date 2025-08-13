# TenderIntel Pro | ტენდერინტელ პრო

AI-driven research and analytics platform for Georgian government procurement tenders.
ხელოვნური ინტელექტით მართული კვლევისა და ანალიტიკის პლატფორმა ქართული სამთავრობო შესყიდვების ტენდერებისთვის.

## Features | ფუნქციები

- 🔐 **Secure Authentication | უსაფრთხო ავთენტიფიკაცია** - Owner-only access with Supabase auth
- 📊 **Advanced Analytics | გაღრმავებული ანალიტიკა** - Interactive charts and data visualization
- 🤖 **AI-Powered Insights | AI-ით მართული ანალიზი** - Intelligent tender analysis and recommendations
- 📋 **Tender Management | ტენდერების მართვა** - Comprehensive tender tracking and filtering
- 📈 **Automated Reports | ავტომატური რეპორტები** - Customizable report generation
- ⚙️ **Flexible Settings | მოქნილი პარამეტრები** - Personalized notifications and preferences
- 🌐 **Georgian Localization | ქართული ლოკალიზაცია** - Full Georgian language support

## Tech Stack | ტექნოლოგიური სტეკი

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth (Mock system for MVP)
- **Charts**: Recharts
- **Deployment**: Docker, Nginx, Vercel

## Quick Start | სწრაფი დაწყება

### Prerequisites | წინაპირობები

- Node.js 18+ 
- Docker and Docker Compose
- Supabase account | Supabase ანგარიში

### Development Setup | განვითარების გარემოს მომზადება

1. **Clone the repository | რეპოზიტორიის კლონირება**
   \`\`\`bash
   git clone <repository-url>
   cd tenderintel-pro
   \`\`\`

2. **Install dependencies | დამოკიდებულებების ინსტალაცია**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables | გარემოს ცვლადების კონფიგურაცია**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   # შეცვალეთ .env.local თქვენი Supabase მონაცემებით
   \`\`\`

4. **Setup database | მონაცემთა ბაზის მომზადება**
   - Create a Supabase project | შექმენით Supabase პროექტი
   - Run SQL scripts in order | გაუშვით SQL სკრიპტები თანმიმდევრობით:
     - `scripts/01_create_tables.sql`
     - `scripts/02_seed_data.sql`
     - `scripts/03_create_functions.sql`

5. **Start development server | განვითარების სერვერის გაშვება**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the application | აპლიკაციაზე წვდომა**
   - Open http://localhost:3000
   - Use mock credentials | გამოიყენეთ ტესტური მონაცემები:
     - Email: `owner@local`
     - Password: `owner123`

### Docker Development | Docker განვითარება

\`\`\`bash
# Start development environment with Docker
./scripts/deploy.sh development

# Stop development environment
docker-compose -f docker-compose.dev.yml down
\`\`\`

## Deployment | განთავსება

### Vercel Deployment (Recommended) | Vercel განთავსება (რეკომენდებული)

1. **Connect to Vercel | Vercel-თან დაკავშირება**
   - Push code to GitHub | კოდის GitHub-ზე ატვირთვა
   - Import project in Vercel | პროექტის იმპორტი Vercel-ში
   - Configure environment variables | გარემოს ცვლადების კონფიგურაცია

2. **Environment Variables in Vercel | გარემოს ცვლადები Vercel-ში**
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   \`\`\`

### Docker Production Deployment | Docker პროდუქციული განთავსება

1. **Configure production environment | პროდუქციული გარემოს კონფიგურაცია**
   \`\`\`bash
   cp .env.example .env.production
   # Edit .env.production with production values
   # შეცვალეთ .env.production პროდუქციული მნიშვნელობებით
   \`\`\`

2. **Deploy to production | პროდუქციაში განთავსება**
   \`\`\`bash
   ./scripts/deploy.sh production
   \`\`\`

3. **Setup SSL certificates | SSL სერტიფიკატების მომზადება**
   \`\`\`bash
   # For production, replace self-signed certificates with real ones
   # პროდუქციისთვის ჩაანაცვლეთ თვითხელმოწერილი სერტიფიკატები რეალურით
   \`\`\`

### Staging Deployment | Staging განთავსება

\`\`\`bash
./scripts/deploy.sh staging
\`\`\`

## Database Setup | მონაცემთა ბაზის მომზადება

The application uses Supabase for database management. Follow these steps:
აპლიკაცია იყენებს Supabase-ს მონაცემთა ბაზის მართვისთვის. მიყევით ამ ნაბიჯებს:

1. **Create Supabase Project | Supabase პროექტის შექმნა**
   - Go to [supabase.com](https://supabase.com)
   - Create new project | შექმენით ახალი პროექტი
   - Copy project URL and keys | დააკოპირეთ პროექტის URL და გასაღებები

2. **Run Database Scripts | მონაცემთა ბაზის სკრიპტების გაშვება**
   - Open Supabase SQL Editor | გახსენით Supabase SQL რედაქტორი
   - Run scripts in order | გაუშვით სკრიპტები თანმიმდევრობით:
     1. `scripts/01_create_tables.sql` - Create all required tables
     2. `scripts/02_seed_data.sql` - Insert initial data
     3. `scripts/03_create_functions.sql` - Create database functions

3. **Configure Authentication | ავთენტიფიკაციის კონფიგურაცია**
   - Go to Authentication → Settings
   - Add Site URL: `https://your-domain.com`
   - Add Redirect URLs for development and production

## Environment Variables | გარემოს ცვლადები

| Variable | Description | Required | ქართული აღწერა |
|----------|-------------|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | Supabase პროექტის URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | Supabase ანონიმური გასაღები |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes | Supabase სერვისის როლის გასაღები |
| `NEXT_PUBLIC_SITE_URL` | Your application URL | Yes | თქვენი აპლიკაციის URL |
| `POSTGRES_URL` | PostgreSQL connection string | Yes | PostgreSQL კავშირის სტრიქონი |

See `.env.example` for complete list. | სრული სია იხილეთ `.env.example`-ში.

## Project Structure | პროექტის სტრუქტურა

\`\`\`
tenderintel-pro/
├── app/                    # Next.js app directory
│   ├── (protected)/       # Protected dashboard routes
│   ├── auth/              # Authentication pages
│   ├── login/             # Login page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── supabase-client.ts # Supabase client configuration
│   ├── supabase-server.ts # Supabase server configuration
│   ├── actions.ts         # Server actions
│   └── icons.tsx          # Icon components
├── scripts/               # Database scripts and deployment
├── docker-compose.yml     # Docker configuration
├── Dockerfile            # Production Docker image
└── README.md             # This file
\`\`\`

## Available Scripts | ხელმისაწვდომი სკრიპტები

- `npm run dev` - Start development server | განვითარების სერვერის გაშვება
- `npm run build` - Build for production | პროდუქციისთვის აგება
- `npm run start` - Start production server | პროდუქციული სერვერის გაშვება
- `npm run lint` - Run ESLint | ESLint-ის გაშვება
- `./scripts/deploy.sh dev` - Start Docker development | Docker განვითარების გაშვება
- `./scripts/deploy.sh prod` - Deploy to production | პროდუქციაში განთავსება

## Mock Authentication | ტესტური ავთენტიფიკაცია

For MVP testing, use these credentials | MVP ტესტირებისთვის გამოიყენეთ ეს მონაცემები:
- **Email**: `owner@local`
- **Password**: `owner123`

## Troubleshooting | პრობლემების გადაჭრა

### Common Issues | ხშირი პრობლემები

1. **Import Errors | იმპორტის შეცდომები**
   - All external package dependencies have been replaced with simple implementations
   - ყველა გარე პაკეტის დამოკიდებულება ჩანაცვლებულია მარტივი იმპლემენტაციებით

2. **Database Connection | მონაცემთა ბაზის კავშირი**
   - Ensure all Supabase environment variables are set correctly
   - დარწმუნდით, რომ ყველა Supabase გარემოს ცვლადი სწორად არის დაყენებული

3. **Authentication Issues | ავთენტიფიკაციის პრობლემები**
   - Check Supabase Auth settings and redirect URLs
   - შეამოწმეთ Supabase Auth პარამეტრები და redirect URL-ები

## Contributing | წვლილის შეტანა

1. Fork the repository | რეპოზიტორიის ფორკი
2. Create a feature branch | ფუნქციის ბრენჩის შექმნა
3. Make your changes | ცვლილებების შეტანა
4. Test thoroughly | საფუძვლიანი ტესტირება
5. Submit a pull request | Pull request-ის გაგზავნა

## License | ლიცენზია

This project is licensed under the MIT License.
ეს პროექტი ლიცენზირებულია MIT ლიცენზიით.

## Support | მხარდაჭერა

For support and questions, please contact the development team.
მხარდაჭერისა და კითხვებისთვის დაუკავშირდით განვითარების გუნდს.
