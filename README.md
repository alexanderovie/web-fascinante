# Fascinante Digital - Professional Website with AI Chatbot

A modern, professional website for Fascinante Digital, a digital marketing agency specializing in SEO, SEM, Google Ads, and comprehensive digital marketing solutions. Built with Next.js 15, featuring an advanced AI chatbot powered by Gemini AI and DataForSEO integration.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-blue)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-2.0%20Flash-orange)
![DataForSEO](https://img.shields.io/badge/DataForSEO-API-green)

## 🚀 Features

### 🤖 **Advanced AI Chatbot**
- **Gemini 2.0 Flash Integration** - Latest Google AI model
- **DataForSEO Integration** - Real-time SEO analysis and insights
- **Professional ChatGPT-style Interface** - Clean, modern design
- **Elite Features** - Monitoring, metrics, circuit breakers, rate limiting
- **Multilingual Support** - Spanish and English
- **File Upload Support** - Images and documents
- **Streaming Responses** - Real-time AI responses

### 🎨 **Modern Design System**
- **Professional UI/UX** - Clean, modern design with consistent branding
- **Dark/Light Mode** - Seamless theme switching
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - GSAP and Lenis for premium interactions
- **Interactive Components** - Sliders, modals, and dynamic elements

### 🌐 **Internationalization**
- **Multi-language Support** - English and Spanish
- **Dynamic Routing** - `/[lang]/` structure
- **Localized Content** - Complete translation system
- **SEO Optimized** - Proper metadata for each language

### 📊 **SEO & Analytics**
- **Real-time SEO Analysis** - DataForSEO integration
- **Keyword Research** - Advanced keyword analysis tools
- **Competitor Analysis** - Domain and SERP analysis
- **Trend Analysis** - Market trend insights
- **Performance Monitoring** - Built-in analytics and metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **AI Integration**: Google Gemini 2.0 Flash
- **SEO Data**: DataForSEO API
- **Animations**: GSAP 3.13, Lenis smooth scrolling
- **Maps**: Leaflet with React integration
- **Theme**: next-themes for dark/light mode
- **Development**: ESLint, Prettier, Husky

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** 18.0 or higher
- **pnpm** package manager (recommended)
- **Git** for version control
- **Google Gemini API Key** for chatbot functionality
- **DataForSEO Credentials** for SEO analysis

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/alexanderovie/web-fascinante.git
cd web-fascinante
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# DataForSEO Configuration
DATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password
DATAFORSEO_BASE_URL=https://api.dataforseo.com/v3

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🎯 Available Pages

### Core Pages
- **Home**: `/` - Main landing page
- **About**: `/about` - Company information and team
- **Services**: `/our-services` - Digital marketing services
- **Blog**: `/blog` - Marketing insights and articles
- **Contact**: `/contact-us` - Contact information and forms

### Language Support
- **English**: `/en/` - English version of all pages
- **Spanish**: `/es/` - Spanish version of all pages

## 🤖 AI Chatbot Features

### Core Functionality
- **Real-time Responses** - Instant AI-powered answers
- **SEO Analysis** - DataForSEO integration for keyword research
- **File Processing** - Image and document analysis
- **Context Awareness** - Maintains conversation history
- **Professional Interface** - ChatGPT-style design

### Elite Features
- **Monitoring & Metrics** - Performance tracking
- **Circuit Breakers** - Fault tolerance
- **Rate Limiting** - API protection
- **Error Handling** - Robust error management
- **Security** - Secure API key management

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format code with Prettier
```

### Project Structure

```
web-fascinante/
├── public/                     # Static assets
│   ├── images/                # Images organized by components
│   └── icons/                 # SVG icons and graphics
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── [lang]/          # Internationalized routes
│   │   ├── api/             # API routes
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── chatbot/         # AI chatbot components
│   │   ├── shared/          # Reusable components
│   │   └── ui/              # Base UI components
│   ├── lib/                 # Utility libraries
│   │   ├── gemini.ts        # Gemini AI integration
│   │   └── dataforseo-*.ts  # DataForSEO integration
│   ├── hooks/               # Custom React hooks
│   └── styles/              # CSS modules and styles
├── .env.local               # Environment variables
└── package.json             # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

Set these environment variables in your deployment platform:

- `GEMINI_API_KEY` - Your Google Gemini API key
- `DATAFORSEO_LOGIN` - Your DataForSEO login
- `DATAFORSEO_PASSWORD` - Your DataForSEO password
- `NEXT_PUBLIC_SITE_URL` - Your production URL

## 📊 SEO & Analytics

### DataForSEO Integration
- **Keyword Research** - Advanced keyword analysis
- **SERP Analysis** - Search engine results analysis
- **Domain Analysis** - Competitor domain insights
- **Trend Analysis** - Market trend data
- **Real-time Data** - Live SEO metrics

### Built-in Analytics
- **Performance Monitoring** - Response times and success rates
- **Usage Metrics** - Chatbot interaction analytics
- **Error Tracking** - Comprehensive error monitoring
- **API Health** - Service availability monitoring

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📧 Support & Contact

- **Website**: [Fascinante Digital](https://fascinantedigital.com)
- **Email**: hello@fascinantedigital.com
- **GitHub Issues**: [Report Issues](https://github.com/alexanderovie/web-fascinante/issues)

## 📄 License

This project is proprietary software owned by Fascinante Digital. All rights reserved.

---

**Made with ❤️ by [Fascinante Digital](https://fascinantedigital.com)**

*Empowering businesses with intelligent digital marketing solutions*