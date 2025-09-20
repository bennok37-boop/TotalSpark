# TotalSpark Landing Pages WordPress Plugin - Installation Guide

## 📋 Prerequisites

Before installing the TotalSpark Landing Pages plugin on your Hostinger WordPress site:

- ✅ WordPress 5.0 or higher
- ✅ PHP 7.4 or higher
- ✅ Admin access to your WordPress dashboard
- ✅ FTP access (optional, for manual installation)

## 🚀 Installation Steps

### Method 1: Direct Upload (Recommended)

1. **Download the Plugin**
   - Download the complete `wordpress-plugin` folder from this project
   - Rename it to `totalspark-landing-pages`
   - Zip the entire folder

2. **Upload to WordPress**
   - Login to your WordPress admin dashboard
   - Go to `Plugins > Add New > Upload Plugin`
   - Choose the zip file and click "Install Now"
   - Activate the plugin

### Method 2: FTP Upload

1. **Upload via FTP**
   - Connect to your Hostinger FTP
   - Navigate to `/public_html/wp-content/plugins/`
   - Upload the `totalspark-landing-pages` folder
   - Go to WordPress admin > Plugins and activate

## ⚙️ Configuration

### 1. Configure GTM ID (Optional)

The plugin is pre-configured with GTM-W4MWH6F3, but you can change it:

```php
// Add to wp-config.php or use WordPress admin
add_option('totalspark_gtm_id', 'GTM-W4MWH6F3');
```

### 2. Set Up Call Tracking Numbers

Edit the tracking numbers in `/assets/totalspark-call-tracking.js`:

```javascript
const trackingNumbers = {
    'newcastle-upon-tyne': '03300 435459',
    'sunderland': '03300 435459',
    'durham': '03300 435459',
    'middlesbrough': '03300 435459',
    // Add your city-specific numbers here
};
```

## 📝 Creating Landing Pages

### Basic Page Structure

Use this shortcode template for all landing pages:

```
[ts_hero city="City Name" service="Service Type" phone="03300 435459"]
[ts_proof_strip]
[ts_features]
[Add your content here]
[ts_quote_form city="City Name" service="service-type"]
[ts_faq]
[ts_sticky_call phone="03300 435459"]
```

### Example: Newcastle Cleaning Page

1. **Create New Page**: Pages > Add New
2. **Set Title**: "Professional Cleaning Services Newcastle upon Tyne"
3. **Set Slug**: `cleaning-newcastle-upon-tyne`
4. **Add Content**: Use the sample content from `sample-pages/newcastle-cleaning-page.txt`

### Example: Sunderland End of Tenancy

1. **Create New Page**: Pages > Add New
2. **Set Title**: "End of Tenancy Cleaning Sunderland"
3. **Set Slug**: `end-of-tenancy-cleaning-sunderland`
4. **Add Content**: Use the sample content from `sample-pages/sunderland-end-of-tenancy-page.txt`

## 🎯 Available Shortcodes

| Shortcode | Parameters | Description |
|-----------|------------|-------------|
| `[ts_hero]` | city, service, title, subtitle, phone | Hero section with CTA buttons |
| `[ts_proof_strip]` | none | Trust signals (DBS, Insurance, etc.) |
| `[ts_features]` | service | Service features grid |
| `[ts_quote_form]` | city, service | Lead capture form |
| `[ts_faq]` | none | Collapsible FAQ section |
| `[ts_sticky_call]` | phone | Floating call button |

## 📊 Analytics & Tracking

### GTM Events Tracked

The plugin automatically tracks these GTM events:

- ✅ `page_view` - Page loads
- ✅ `call_click` - Phone number clicks
- ✅ `quote_started` - Quote form interactions
- ✅ `quote_completed` - Form submissions
- ✅ `dynamic_number_assigned` - Call tracking

### Lead Management

Quote submissions are:
- ✅ Stored in WordPress database (`wp_totalspark_quotes`)
- ✅ Emailed to admin
- ✅ Tracked in GTM/GA4

## 🎨 Styling & Customization

### Custom CSS

Add custom styles in your theme's `style.css` or Customizer:

```css
/* Override TotalSpark styles */
.ts-hero-section {
    background: your-custom-gradient;
}

.ts-btn-primary {
    background-color: your-brand-color;
}
```

### Color Scheme

The plugin uses a professional blue/green color scheme:
- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Text: `#1e293b` (Dark Gray)
- Muted: `#64748b` (Gray)

## 📱 Mobile Optimization

The plugin is fully responsive with:
- ✅ Mobile-optimized forms
- ✅ Touch-friendly buttons
- ✅ Responsive grids
- ✅ Sticky call button

## 🔧 Troubleshooting

### Common Issues

**Forms not submitting?**
- Check that jQuery is loaded
- Verify AJAX URL in browser console
- Ensure nonce is working

**Call tracking not working?**
- Check browser console for errors
- Verify phone numbers in tracking config
- Test GTM container is loading

**GTM not firing?**
- Confirm GTM-W4MWH6F3 is active
- Check dataLayer in browser console
- Verify GTM container permissions

### Debug Mode

Enable WordPress debug mode in `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## 📈 SEO Optimization

### For Each Landing Page:

1. **Title Tag**: Include city + service
2. **Meta Description**: 150-160 characters with local terms
3. **URL Slug**: `service-city-name` format
4. **H1 Tag**: Include target keywords
5. **Schema Markup**: Plugin auto-generates JSON-LD

### Recommended Page Structure:

- City + Service in title
- Local area keywords in content
- Service-specific FAQs
- Local area coverage lists
- Contact information

## 🚀 Priority Cities & Services

Based on your React app, create pages for these combinations:

### Major Cities:
- Newcastle upon Tyne
- Sunderland  
- Durham
- Middlesbrough
- Gateshead
- Hartlepool
- South Shields
- Stockton-on-Tees

### Services per City:
- General Cleaning
- End of Tenancy Cleaning
- Deep Cleaning
- Commercial Cleaning
- Carpet & Upholstery Cleaning

**Total Priority Pages**: ~40 pages

## 📞 Support

For technical support with the plugin:
- Check the WordPress error logs
- Review browser console for JavaScript errors
- Verify all shortcodes are spelled correctly
- Test on a staging site first

---

**Ready to go live?** Start with Newcastle and Sunderland pages, then expand to other cities based on performance!