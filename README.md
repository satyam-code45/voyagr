# 🌍 Voyagr - Travel Itinerary Planning App

A modern travel itinerary planning application built with Next.js, TypeScript, and PostgreSQL.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748)](https://prisma.io/)

## Features

- 🎯 Create and manage travel itineraries
- 📅 Day-by-day activity planning
- 🔐 JWT-based authentication
- 🌤️ Weather forecasts for destinations
- 📸 Destination images via Pexels API
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 15.5.4, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: JWT + bcryptjs
- **External APIs**: Pexels (images), Open-Meteo (weather)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone and install
git clone https://github.com/satyam-code45/voyagr.git
cd voyagr
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database URL and secrets

# Set up database
npx prisma db push
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/voyagr"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
NEXT_PUBLIC_PEXELS_API_KEY="your_pexels_api_key" # Optional
```

## Database

Uses Prisma ORM with PostgreSQL. Schema includes User, Trip, and Activity models.

```bash
npx prisma studio  # View database
npx prisma db push # Update schema
```

## API Endpoints

- **Auth**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- **Trips**: `/api/trips` (CRUD operations)
- **Images**: `/api/images/destination?query={location}`

## Project Structure

```
app/          # Next.js App Router & API routes
components/   # Reusable UI components  
lib/          # Utilities (auth, database, APIs)
prisma/       # Database schema
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

Set environment variables in Vercel dashboard and ensure database is accessible.

## Scripts

```bash
npm run dev    # Development server
npm run build  # Production build  
npm run lint   # Run linting
```

## License

MIT License - see [LICENSE](LICENSE) file.

## Author

**Satyam** - [@satyam-code45](https://github.com/satyam-code45)
