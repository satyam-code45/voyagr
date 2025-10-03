# 🌍 Voyagr - Travel Itinerary Planning App

> **Your Journey Starts Here** - Create, organize, and manage beautiful travel itineraries with ease.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)](https://postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🎯 Overview

Voyagr is a modern, full-stack travel itinerary planning application that allows users to create detailed trip plans, organize activities day by day, and visualize their adventures with beautiful destination images and real-time weather data.

**Live Demo:** [Coming Soon]

### Key Highlights
- 🎨 Beautiful, responsive design with dark/light theme support
- 🔐 Secure JWT-based authentication system
- 🌤️ Real-time weather forecasts for destinations
- 📸 Dynamic destination images via Pexels API
- 📱 Fully responsive across all devices
- ⚡ Fast, modern tech stack with TypeScript

## ✨ Features

### Core Features
- **Trip Management**: Create, view, and organize travel itineraries
- **Day-by-Day Planning**: Structure activities by day with specific times
- **User Authentication**: Secure signup/login with JWT tokens
- **Trip Dashboard**: Personal dashboard to manage all your trips
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Bonus Features
- **Weather Integration**: Real-time weather forecasts using Open-Meteo API
- **Destination Images**: Beautiful destination photos via Pexels API
- **Authentication-Aware UI**: Dynamic navigation based on login status
- **Theme Support**: Dark and light mode toggle
- **Form Validation**: Comprehensive input validation with Zod
- **Loading States**: Smooth loading indicators and skeleton screens

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Hooks + Context
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Fonts**: Playfair Display + Inter (Google Fonts)

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Database ORM**: Prisma 6.16.3
- **Database**: PostgreSQL (Neon)
- **Validation**: Zod schemas

### External APIs
- **Images**: Pexels API
- **Weather**: Open-Meteo API
- **Analytics**: Vercel Analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- PostgreSQL database (or Neon account)
- Pexels API key (optional, for images)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/satyam-code45/voyagr.git
cd voyagr
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your database**
```bash
npx prisma db push
npx prisma generate
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# External APIs (Optional)
PEXELS_API_KEY="your_pexels_api_key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Getting API Keys

1. **Pexels API** (Optional - for destination images)
   - Sign up at [Pexels API](https://www.pexels.com/api/)
   - Get your free API key
   - Add to `.env` as `PEXELS_API_KEY`

2. **Database** (Required)
   - Use [Neon](https://neon.tech/) for free PostgreSQL
   - Or set up local PostgreSQL
   - Add connection string to `DATABASE_URL`

## 🗄️ Database Setup

The application uses Prisma as the ORM with the following schema:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String?
  trips     Trip[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Trip {
  id          String     @id @default(uuid())
  destination String
  startDate   DateTime
  endDate     DateTime
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  activities  Activity[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model Activity {
  id          String   @id @default(uuid())
  tripId      String
  day         Int
  time        String
  description String
  trip        Trip     @relation(fields: [tripId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Database Commands
```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Reset database (development only)
npx prisma db push --force-reset

# View database in Prisma Studio
npx prisma studio
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get user's trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/[id]` - Get specific trip
- `PUT /api/trips/[id]` - Update trip
- `DELETE /api/trips/[id]` - Delete trip

### External Data
- `GET /api/images/destination?query={location}` - Get destination image
- Weather data is fetched server-side in trip components

## 📁 Project Structure

```
voyagr/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── images/       # Image proxy endpoints
│   │   └── trips/        # Trip CRUD endpoints
│   ├── dashboard/        # Protected dashboard pages
│   ├── login/           # Authentication pages
│   ├── signup/
│   ├── trips/           # Public trip viewing
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui base components
│   ├── landing/         # Landing page components
│   └── dashboard/       # Dashboard components
├── lib/                 # Utility functions
│   ├── auth.ts          # Authentication utilities
│   ├── prisma.ts        # Database client
│   ├── weather.ts       # Weather API integration
│   ├── pexels.ts        # Image API integration
│   └── types.ts         # TypeScript types
├── prisma/              # Database schema
│   └── schema.prisma
└── public/              # Static assets
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Deploy to Vercel**
```bash
npm install -g vercel
vercel
```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from your `.env` file

3. **Configure Database**
   - Ensure your `DATABASE_URL` points to a production database
   - Run `npx prisma db push` to sync schema

### Manual Deployment

1. **Build the application**
```bash
npm run build
npm start
```

2. **Set up production database**
3. **Configure environment variables**
4. **Deploy to your hosting platform**

## 🏗️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Database
npx prisma studio   # Open Prisma Studio
npx prisma generate # Generate Prisma client
npx prisma db push  # Push schema to database

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript checks
```

## 🎨 Design System

Voyagr uses a consistent design system built with Tailwind CSS and shadcn/ui:

- **Colors**: Custom primary palette with teal and blue gradients
- **Typography**: Playfair Display (headings) + Inter (body)
- **Components**: Fully accessible shadcn/ui components
- **Spacing**: Consistent 8px grid system
- **Animations**: Subtle hover effects and transitions

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CORS Configuration**: Proper CORS setup for API endpoints

## 📱 Responsive Design

Voyagr is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Satyam** - [@satyam-code45](https://github.com/satyam-code45)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://prisma.io/) - Next-generation ORM for TypeScript
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Pexels](https://pexels.com/) - Free stock photos API
- [Open-Meteo](https://open-meteo.com/) - Free weather API

---

<div align="center">
  <p>Built with ❤️ using Next.js and TypeScript</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
