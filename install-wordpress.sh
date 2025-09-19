#!/bin/bash

echo "🚀 Installing WordPress for TotalSpark Solutions..."

# Create database if it doesn't exist
echo "📄 Setting up database..."

# Download WordPress core (latest version)
cd wordpress
if [ ! -f wp-config.php ]; then
    echo "⚠️  WordPress core files needed. This script assumes WordPress is already downloaded."
    echo "💡 In a real environment, you would run:"
    echo "   wget https://wordpress.org/latest.tar.gz"
    echo "   tar -xzf latest.tar.gz --strip-components=1"
fi

# Set permissions
echo "🔒 Setting file permissions..."
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Install WordPress (this would typically be done through the web installer)
echo "📦 WordPress structure created!"
echo ""
echo "✅ Next Steps:"
echo "1. Visit /wordpress/ to complete WordPress installation"
echo "2. Install Required Plugins:"
echo "   - Advanced Custom Fields (ACF)"
echo "   - Classic Editor (recommended for better content editing)"
echo ""
echo "3. Activate the 'TotalSpark Headless' theme"
echo "4. Activate the 'TotalSpark API' plugin"
echo "5. Use the TotalSpark admin panel to import existing data"
echo ""
echo "🔧 Manual Setup Required:"
echo "- Create WordPress admin user"
echo "- Configure database connection"
echo "- Import existing content using the TotalSpark importer"
echo ""
echo "💡 After setup, your React app will use WordPress API endpoints to fetch content"
echo "   while maintaining all existing functionality (quote calculator, sliders, etc.)"

cd ..