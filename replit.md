# TotalSpark Solutions - North East UK Cleaning Service Website

## Overview

TotalSpark Solutions is a professional cleaning service website targeting the North East UK market, specifically serving Newcastle, Leeds, York, Sunderland, and Middlesbrough. The application is designed as a high-converting, SEO-friendly platform that facilitates quote requests for various cleaning services including end-of-tenancy, commercial, deep cleaning, and carpet & upholstery cleaning. The site emphasizes trust signals, local market targeting, and conversion optimization with features like instant quote forms, deposit-back guarantees, and DBS-checked staff credentials.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based architecture built with Vite for fast development and optimized production builds. The frontend is structured around a component-based design system using shadcn/ui components with Radix UI primitives for accessibility and TypeScript for type safety.

**Key Frontend Decisions:**
- **React with TypeScript**: Provides type safety and better developer experience
- **Vite Build System**: Fast development server and optimized production builds
- **Wouter Routing**: Lightweight client-side routing solution
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Component Architecture**: Modular, reusable components following the "New York" shadcn/ui style

### Design System
The application implements a comprehensive design system with predefined color palettes, typography, and spacing that aligns with professional service provider aesthetics:
- **Color Scheme**: Professional blues for trust, greens for CTAs, with neutral backgrounds
- **Typography**: Inter font for headings and system fonts for body text
- **Component Library**: Extensive UI components including cards, forms, accordions, and navigation elements
- **Responsive Design**: Mobile-first approach with sticky call buttons and touch-friendly interfaces

### Backend Architecture
The backend follows a lightweight Express.js architecture with TypeScript support and modular route organization:
- **Express.js Server**: RESTful API structure with middleware for logging and error handling
- **Storage Interface**: Abstracted storage layer allowing for different implementations (currently using in-memory storage)
- **Route Organization**: Centralized route registration with API prefix structure
- **Development Integration**: Seamless Vite integration for development mode

### Database Design
The application uses Drizzle ORM with PostgreSQL for data persistence:
- **Schema Design**: Clean separation of user management and quote request entities
- **Quote Requests**: Comprehensive form data capture including city, service type, property details, and pricing estimates
- **Type Safety**: Zod schema validation ensuring data integrity
- **Migration Support**: Drizzle Kit for database schema management

### State Management
The application employs React Query (TanStack Query) for server state management:
- **API Layer**: Centralized API request handling with error management
- **Query Management**: Optimized data fetching with caching and background updates
- **Form State**: React Hook Form integration for complex multi-step quote forms

### Routing Strategy
The routing system is designed around SEO-friendly URL structure with deep linking support:
- **City-Based Pages**: Dynamic routing for location-specific landing pages (/cleaning-{city})
- **Service Pages**: Dedicated routes for each service type
- **Homepage**: Central hub showcasing all services and locations
- **Deep Linking**: URL hash fragments enable direct navigation to page sections

### Direct URL Structure
The application supports deep linking to specific sections using URL hash fragments. This enables marketing campaigns, Google Ads, and social media to direct users to relevant content:

**Homepage Deep Links:**
- `/#quote` - Direct link to quote/booking form
- `/#services` - Direct link to services section
- `/#pricing` - Direct link to pricing information (alias for services)
- `/#areas` - Direct link to areas covered section
- `/#faq` - Direct link to frequently asked questions

**City Page Deep Links:**
- `/cleaning/{city}#quote` - City-specific quote form
- `/cleaning/{city}#services` - City-specific services
- `/cleaning/{city}#pricing` - City-specific pricing
- `/cleaning/{city}#faq` - City-specific FAQs

**Service Page Deep Links:**
- `/end-of-tenancy-cleaning#quote` - End of tenancy booking
- `/commercial-cleaning#quote` - Commercial cleaning booking
- `/deep-cleaning#quote` - Deep cleaning booking
- `/carpet-upholstery-cleaning#quote` - Carpet cleaning booking

**Technical Implementation:**
- Custom `useHashScroll` hook handles hash detection and smooth scrolling
- All sections have unique IDs and `scroll-mt-20` class for proper header offset
- Smooth scroll behavior with 100ms delay for full page render
- Works consistently across all page types (home, city, service)

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe variant management for components

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle ORM**: Type-safe database toolkit with schema management
- **Drizzle Kit**: Database migration and introspection tools

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **Vite**: Modern build tool with fast HMR and optimized builds
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Form Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration with validation libraries
- **Zod**: Runtime type validation for form schemas

### State and Data Fetching
- **TanStack React Query**: Server state management with caching
- **Date-fns**: Modern date utility library for date manipulation

### Authentication and Session Management
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware for user authentication

The application architecture prioritizes performance, SEO optimization, and conversion rate optimization while maintaining clean separation of concerns and type safety throughout the stack.