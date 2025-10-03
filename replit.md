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

### File Upload Integration
- **Uppy Core & Dashboard**: Modern file uploader with modal interface
- **Google Cloud Storage**: Direct upload to GCS using presigned URLs
- **Custom DirectUploadPlugin**: Direct-to-cloud upload implementation for job photos

The application architecture prioritizes performance, SEO optimization, and conversion rate optimization while maintaining clean separation of concerns and type safety throughout the stack.

## Recent Changes (October 3, 2025)

### Enhanced Pricing Engine with Toilets and Living Rooms Scaling
Extended the domestic pricing calculation to include toilets and living rooms as scaling factors:

**Pricing Additions:**
1. **Toilet Scaling**: Extra toilets beyond 1 add 3% per toilet (capped at 15% for 5+ extra toilets)
2. **Living Room Scaling**: Extra living rooms beyond 1 add 4% per room (capped at 15% for 4+ extra rooms)

**Calculation Logic:**
- Baseline: 1 toilet and 1 living room are included (no extra charge)
- Extra toilets: `price *= (1 + min(0.15, extraToilets * 0.03))`
- Extra living rooms: `price *= (1 + min(0.15, extraLivingRooms * 0.04))`
- Applied in `applyDomesticScaling()` function alongside bathrooms and other property factors
- Multipliers combine multiplicatively with all other scaling factors

**Example Calculations:**
- 2-bed flat End of Tenancy baseline: £160
- With 2 toilets (1 extra): £160 × 1.03 = £164.80
- With 2 living rooms (1 extra): £160 × 1.04 = £166.40
- With both 2 toilets + 2 living rooms: £160 × 1.03 × 1.04 = £171.39

**Files Modified:**
- `client/src/utils/pricingEngine.ts`: Added toilet and living room scaling with caps in `applyDomesticScaling()` function
- `client/src/components/QuoteForm.tsx`: Already passing `toilets` and `livingRooms` to pricing engine

**Testing Status:**
- Architect review confirmed logic is correct
- Console logging added for visibility (`💧 Extra toilets` and `🛋️ Extra living rooms`)
- Real-time price updates when form values change

### Multi-Stage Lead Capture System
Implemented comprehensive lead tracking at three critical stages of the quote funnel to capture drop-offs and enable follow-up at every conversion point:

**Lead Capture Points:**
1. **Stage 1 - Personal Details Entry (Step 1)**:
   - Triggers immediately after Step 1 form validation passes
   - Captures: name, phone, email, address, postcode
   - Lead data: `{source: 'website_form_step1', service: 'Not selected yet', value: 0, notes: personal details}`
   - GTM event: `quote_step1_completed`
   - **Purpose**: Track early drop-offs for follow-up before service selection

2. **Stage 2 - Quote Estimate Shown (Step 2)**:
   - Triggers after quote calculation and Step 2 submission  
   - Captures: service type, estimated value, property details
   - Lead data: `{source: 'website_form', service: actual service, value: estimated total, notes: quote details}`
   - GTM events: `quote_completed`, `form_submit`, `lead_added`
   - **Purpose**: Track users who viewed quote estimate but didn't proceed to booking

3. **Stage 3 - Booking Confirmed (Step 4)**:
   - Triggers after successful booking submission
   - Captures: all quote details plus booking date, time slot, and notes
   - Lead data: `{source: 'website_booking_confirmed', service: actual service, value: quote total, notes: booking details}`
   - GTM event: `booking_confirmed`
   - **Purpose**: Track confirmed bookings with complete appointment details

**Technical Implementation:**
- All leads stored in localStorage key: `totalspark_leads_tracker`
- GTM events pushed to `window.dataLayer` for analytics integration
- Shared helper functions (`extractCityFromAddress`, `serviceLabels`, `getBedrooms`) consolidated for consistency
- Lead tracking uses singleton pattern via `getLeadTracker()` function
- Each lead includes UTM parameters, timestamp, and status tracking

**Benefits:**
- Enables follow-up with users who drop off at any stage
- Provides visibility into funnel conversion metrics
- Captures contact details early before users abandon the flow
- Tracks booking confirmations with full appointment context
- All leads exportable to CSV for weekly review

**Files Modified:**
- `client/src/components/QuoteForm.tsx`: Added lead capture at Steps 1, 2, and 4 with GTM events
- `client/src/lib/leadTracking.ts`: Lead storage and tracking infrastructure (already existed)

**Testing Status:**
Automated testing confirmed:
- All three lead capture stages fire correctly
- Leads stored in localStorage with proper source attribution
- GTM events pushed to dataLayer with complete metadata
- No duplicate leads on form re-entry
- Booking confirmation shows all three leads with distinct sources

## Recent Changes (October 2, 2025)

### Quote Form Validation Improvements
Fixed critical form validation issues that were preventing users from progressing through the multi-step quote form:

**Problems Solved:**
1. **Native HTML5 Validation Conflict**: Native browser validation was interfering with React's controlled inputs, causing the form to block progression even with valid data
2. **Overly Restrictive Postcode Validation**: Previous regex pattern rejected valid UK postcodes including BFPO codes and special cases
3. **ObjectUploader Runtime Error**: Uppy cleanup function was calling non-existent `close()` method, causing runtime errors

**Solutions Implemented:**
1. **Custom Validation System**:
   - Added `noValidate` attribute to form element to disable native HTML5 validation
   - Implemented comprehensive custom validation in `handleStep1Submit` function
   - All fields validated with trimming and proper error messages via toast notifications
   
2. **Comprehensive UK Postcode Validation**:
   - Implemented GOV.UK canonical postcode pattern
   - Supports all valid UK postcode formats:
     - Standard postcodes (NE1 1AA, SW1A 1AA, M1 1AA, etc.)
     - Special case (GIR 0AA - Girobank)
     - BFPO codes (BFPO 1, BFPO 1234, BF1 3AA, etc.)
     - Overseas territories (ASCN 1ZZ, STHL 1ZZ, TDCU 1ZZ, etc.)
   - Normalizes input (trim + uppercase) before validation
   - Accepts postcodes with or without spaces
   - Pattern: `/^(GIR ?0AA|((ASCN|STHL|TDCU|BBND|BIQQ|FIQQ|GX11|PCRN|SIQQ|TKCA) ?1ZZ)|(BFPO ?\d{1,4})|([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}))$/i`

3. **ObjectUploader Cleanup Fix**:
   - Replaced `uppy.close()` with proper cleanup sequence:
     - `uppy.cancelAll()` - Cancel any ongoing uploads
     - `uppy.clear()` - Clear all files from queue
     - Close dashboard modal if open
   - Prevents runtime errors during component unmount
   - Maintains proper cleanup without destroying Uppy instance prematurely

**Files Modified:**
- `client/src/components/QuoteForm.tsx`: Form validation logic and noValidate attribute
- `client/src/components/ObjectUploader.tsx`: Uppy cleanup implementation

**Testing Status:**
Automated testing confirmed that:
- Step 1 validation works correctly with all field types
- Form successfully progresses from Step 1 to Step 2
- All validation error messages display properly
- No runtime errors during normal usage