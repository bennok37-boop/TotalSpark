# TotalSpark Solutions - Headless WordPress Website

## 🎯 Project Status: WordPress-Ready Architecture

This TotalSpark Solutions website has been converted from a static React/Express application to a **headless WordPress architecture**. The conversion preserves all existing functionality while adding powerful content management capabilities.

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Starts the development server on `http://localhost:5000`

### Key Features Working
- ✅ Quote calculator with email notifications
- ✅ Before/after image sliders  
- ✅ CallRail phone number pooling
- ✅ Responsive design and SEO optimization
- ✅ WordPress API integration with smart fallback

## 🏗️ Architecture

### Current Setup
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js with WordPress integration layer
- **Content**: WordPress headless CMS (when installed)
- **Fallback**: Local data ensures continuous operation
- **Styling**: Tailwind CSS + shadcn/ui components

### WordPress Integration
- **API Client**: Smart WordPress REST API client with fallback
- **Content Types**: Services, locations, before/after pairs, testimonials
- **Admin Interface**: Custom WordPress admin for content management
- **Security**: WordPress files not exposed, API-only communication

## 📁 Project Structure

```
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # UI components
│   │   ├── pages/                  # Route components  
│   │   ├── lib/                    # Utilities and API clients
│   │   │   ├── wordpressApi.ts     # WordPress API client
│   │   │   └── queryClient.ts      # React Query configuration
│   │   └── hooks/                  # Custom React hooks
│   │       └── useWordPressContent.ts # WordPress data hooks
├── server/                          # Express backend
│   ├── routes.ts                   # API routes
│   ├── wordpress.ts                # WordPress integration
│   └── index.ts                    # Server entry point
├── shared/                          # Shared TypeScript schemas
├── wordpress/                       # WordPress installation
│   ├── wp-content/
│   │   ├── themes/headless-totalspark/    # Custom headless theme
│   │   └── plugins/totalspark-api/        # Custom plugin
│   └── wp-config.php               # WordPress configuration
└── install-wordpress.sh            # Installation script
```

## 🔧 WordPress Setup

### Prerequisites
The WordPress backend requires:
- PHP 7.4+ with MySQL/MariaDB
- WordPress core installation
- Advanced Custom Fields (ACF) plugin

### Installation Steps
1. **Install WordPress** (separate subdomain recommended)
2. **Configure environment**: Set `VITE_WORDPRESS_URL` 
3. **Activate components**: Enable TotalSpark theme and plugin
4. **Import data**: Use WordPress admin to import existing content

See `WORDPRESS-CONVERSION-GUIDE.md` for detailed instructions.

## 🌟 Features

### Customer-Facing
- **Quote Calculator**: Multi-step form with pricing logic
- **Service Pages**: Dynamic content for each cleaning service  
- **City Pages**: Localized content for each service area
- **Before/After Gallery**: Interactive sliders with filtering
- **Responsive Design**: Mobile-optimized with sticky call buttons
- **CallRail Integration**: Dynamic phone number pooling

### Content Management (WordPress)
- **Service Management**: Edit descriptions, features, pricing
- **Location Management**: Update city pages and coverage areas
- **Media Management**: Drag-and-drop before/after image uploads
- **Testimonial Management**: Add customer reviews and ratings
- **SEO Control**: Meta descriptions, titles, and structured data

### Developer Features  
- **TypeScript**: Full type safety across frontend and backend
- **React Query**: Optimized data fetching with caching
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Library**: shadcn/ui components for consistency
- **API-First**: Clean separation between content and presentation

## 🔌 API Endpoints

### WordPress REST API (when available)
- `GET /wp-json/wp/v2/services` - Cleaning services
- `GET /wp-json/wp/v2/locations` - Service locations  
- `GET /wp-json/wp/v2/before-after` - Before/after image pairs
- `GET /wp-json/wp/v2/testimonials` - Customer testimonials

### Internal API (always available)
- `POST /api/quotes` - Quote request submission
- `GET /api/media/before-after` - Before/after images (fallback)
- Email sending via Resend API

## 🛡️ Security

### Production Security
- WordPress files not served statically
- API-only communication with WordPress
- Environment variable configuration for sensitive data
- Secure file permissions and access controls

### Development Security  
- WordPress static serving disabled by default
- `UNSAFE_SERVE_WP_FILES=true` required for local WordPress file access
- Database credentials in environment variables only

## 🚀 Deployment

### Frontend Deployment
Standard React deployment process:
```bash
npm run build
```
Deploy `client/dist` to your hosting provider.

### WordPress Deployment  
1. Install WordPress on hosting provider or subdomain
2. Upload WordPress theme and plugin files
3. Configure `VITE_WORDPRESS_URL` environment variable
4. Complete WordPress setup through admin interface

## 📊 Performance

### Optimization Features
- **Smart Fallback**: No downtime during WordPress maintenance
- **Caching**: React Query caches WordPress API responses
- **Code Splitting**: Optimized bundle loading
- **Image Optimization**: Responsive images with proper sizing
- **CDN Ready**: Static assets served from optimized paths

### Monitoring
- CallRail phone tracking active and logging
- Quote form submissions logged and emailed
- WordPress API fallback status monitored
- Performance metrics available through browser dev tools

## 🔍 SEO Features

### Technical SEO
- Clean URL structure maintained
- Meta tags and Open Graph data
- Structured data for local business
- Mobile-friendly responsive design
- Fast loading times with optimization

### Content SEO (WordPress)
- Editable meta descriptions and titles
- Custom page content management
- Image alt text and captions
- Local business schema markup

## 🤝 Contributing

### Development Setup
1. Clone repository
2. `npm install` 
3. Copy `.env.example` to `.env`
4. `npm run dev`

### WordPress Development
1. Follow WordPress setup guide
2. Activate TotalSpark theme and plugin
3. Import sample data through admin interface
4. Test API endpoints and fallback behavior

## 📝 License

This project is proprietary software for TotalSpark Solutions.

---

**Need help with WordPress setup?** See `WORDPRESS-CONVERSION-GUIDE.md` for complete instructions and benefits of the headless WordPress architecture.