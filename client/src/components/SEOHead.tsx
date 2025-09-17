import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: 'website' | 'article' | 'service';
  ogImage?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  structuredData?: Record<string, any> | Record<string, any>[];
}

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage,
  keywords,
  author = 'TotalSpark Solutions',
  robots = 'index,follow',
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Ensure title includes company name if not already present
    const fullTitle = title.includes('TotalSpark') ? title : `${title} | TotalSpark Solutions`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('href', href);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('author', author);
    updateMetaTag('robots', robots);
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    updateMetaTag('og:title', ogTitle || fullTitle, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', 'TotalSpark Solutions', true);
    updateMetaTag('og:locale', 'en_GB', true);
    
    // Set current URL for OG if not provided
    const currentUrl = canonicalUrl || window.location.href;
    updateMetaTag('og:url', currentUrl, true);
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Update canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || fullTitle);
    updateMetaTag('twitter:description', ogDescription || description);
    
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // Add theme colors
    updateMetaTag('theme-color', '#0ea5e9');
    updateMetaTag('msapplication-TileColor', '#0ea5e9');

    // Handle structured data
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData]);
      document.head.appendChild(script);
    }

  }, [title, description, canonicalUrl, ogTitle, ogDescription, ogType, ogImage, keywords, author, robots, structuredData]);

  return null; // This component doesn't render anything
}