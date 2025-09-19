import type { Express } from "express";
import express from "express";
import path from "path";

// WordPress integration for TotalSpark Solutions
export function setupWordPressIntegration(app: Express) {
  
  console.log('🔌 WordPress integration layer configured');
  console.log('📦 WordPress files prepared for installation');
  console.log('⚠️  WordPress not serving files - requires proper PHP/MySQL setup');
  console.log('💡 React app using fallback data until WordPress is installed');
  
  // SECURITY: Do NOT serve WordPress files as static content in production
  // This would expose wp-config.php and other sensitive files
  
  // For development/testing only - commented out for security
  if (process.env.NODE_ENV === 'development' && process.env.UNSAFE_SERVE_WP_FILES === 'true') {
    console.log('⚠️  UNSAFE: Serving WordPress files statically for development only');
    app.use('/wordpress', express.static(path.resolve(import.meta.dirname, '../wordpress')));
  }
  
  // Production setup would involve:
  // 1. Install WordPress on separate subdomain or server
  // 2. Configure VITE_WORDPRESS_URL environment variable
  // 3. WordPress admin at https://your-wp-install/wp-admin/
  // 4. WordPress API at https://your-wp-install/wp-json/
  // 5. Install Advanced Custom Fields plugin
  // 6. Activate TotalSpark theme and plugin
  // 7. Import content using the TotalSpark admin panel
}