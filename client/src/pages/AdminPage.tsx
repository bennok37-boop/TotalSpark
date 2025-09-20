// Admin dashboard page with leads tracking, analytics overview, and site management

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeadsTracker } from '@/components/LeadsTracker';
import { generateSitemapForDomain, generateRobotsTxt } from '@/lib/sitemapGenerator';
import { getCurrentUTMParams, generateUTMReport } from '@/lib/utmStandards';
import { Download, Globe, Search, Target, Users } from 'lucide-react';

export default function AdminPage() {
  const [sitemapContent, setSitemapContent] = useState('');
  const [robotsContent, setRobotsContent] = useState('');
  
  const generateSitemap = () => {
    const sitemap = generateSitemapForDomain();
    setSitemapContent(sitemap);
    
    // Also generate robots.txt
    const robots = generateRobotsTxt();
    setRobotsContent(robots);
  };

  const downloadSitemap = () => {
    if (!sitemapContent) generateSitemap();
    
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadRobots = () => {
    if (!robotsContent) generateSitemap();
    
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const utmReport = generateUTMReport();
  const currentUTM = getCurrentUTMParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">TotalSpark Admin Dashboard</h1>
        <p className="text-gray-600">Analytics, leads tracking, and site management</p>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leads">
            <Users className="w-4 h-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Target className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="w-4 h-4 mr-2" />
            SEO Tools
          </TabsTrigger>
          <TabsTrigger value="utm">
            <Globe className="w-4 h-4 mr-2" />
            UTM Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads">
          <LeadsTracker />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Google Tag Manager</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2">
                        GTM ID: {import.meta.env.VITE_GTM_ID || 'Not configured'}
                      </p>
                      <Badge variant={import.meta.env.VITE_GTM_ID ? 'default' : 'secondary'}>
                        {import.meta.env.VITE_GTM_ID ? 'Active' : 'Not Set'}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">GA4 Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>✓ form_submit</p>
                        <p>✓ call_click</p>
                        <p>✓ whatsapp_click</p>
                        <p>✓ quote_started</p>
                        <p>✓ quote_completed</p>
                        <p>✓ chat_open</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Setup Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">
                      <strong>1. Google Tag Manager:</strong> Add your GTM-XXXXXXX ID to VITE_GTM_ID environment variable
                    </p>
                    <p className="text-sm">
                      <strong>2. Google Search Console:</strong> Download sitemap.xml and submit to GSC
                    </p>
                    <p className="text-sm">
                      <strong>3. Bing Webmaster Tools:</strong> Submit sitemap.xml and verify domain ownership
                    </p>
                    <p className="text-sm">
                      <strong>4. CallRail Integration:</strong> Dynamic numbers configured for city/service tracking
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO File Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button onClick={downloadSitemap}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Sitemap.xml
                  </Button>
                  <Button onClick={downloadRobots} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Robots.txt
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Google Search Console</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Download sitemap.xml from above</li>
                        <li>Go to Search Console → Sitemaps</li>
                        <li>Submit sitemap URL: {window.location.origin}/sitemap.xml</li>
                        <li>Monitor indexing status and errors</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Bing Webmaster Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Verify domain ownership</li>
                        <li>Go to Sitemaps → Submit Sitemap</li>
                        <li>Submit sitemap URL: {window.location.origin}/sitemap.xml</li>
                        <li>Review crawl status and insights</li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Page UTM Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3">Current UTM Parameters</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Source:</span> {currentUTM.source || 'Not set'}</p>
                    <p><span className="font-medium">Medium:</span> {currentUTM.medium || 'Not set'}</p>
                    <p><span className="font-medium">Campaign:</span> {currentUTM.campaign || 'Not set'}</p>
                    <p><span className="font-medium">Term:</span> {currentUTM.term || 'Not set'}</p>
                    <p><span className="font-medium">Content:</span> {currentUTM.content || 'Not set'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Attribution Report</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Campaign Type:</span> {utmReport.campaign_type}</p>
                    <p><span className="font-medium">Attribution:</span> {utmReport.attribution}</p>
                    <p><span className="font-medium">Valid Structure:</span> 
                      <Badge variant={utmReport.is_valid ? 'default' : 'destructive'} className="ml-2">
                        {utmReport.is_valid ? 'Valid' : 'Invalid'}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UTM Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Internal Profile Links</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <code>utm_source=google&utm_medium=organic&utm_campaign=local_city</code>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Google Ads</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <code>utm_source=google&utm_medium=cpc&utm_campaign=cleaning_services</code>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Social Media</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <code>utm_source=social&utm_medium=post&utm_campaign=brand_awareness</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}