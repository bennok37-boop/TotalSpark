// Weekly Leads Tracking Dashboard
// Simple interface for reviewing leads: date, source, city page, service, value, won/lost

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, TrendingUp, Users, DollarSign, Star } from 'lucide-react';
import { getLeadTracker, Lead } from '@/lib/leadTracking';

export function LeadsTracker() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<any>({});
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const leadTracker = getLeadTracker();

  useEffect(() => {
    loadLeads();
    loadWeeklyStats();
  }, []);

  const loadLeads = () => {
    setLeads(leadTracker.getAllLeads().slice(0, 100)); // Show recent 100 leads
  };

  const loadWeeklyStats = () => {
    setWeeklyStats(leadTracker.getWeeklyStats());
  };

  const handleStatusUpdate = (leadId: string, newStatus: Lead['status']) => {
    leadTracker.updateLeadStatus(leadId, newStatus);
    loadLeads();
    loadWeeklyStats();
  };

  const exportCSV = () => {
    const csvContent = leadTracker.exportCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `totalspark-leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'lost': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'contacted': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'quoted': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const filteredLeads = selectedStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leads Tracker</h2>
        <Button onClick={exportCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Weekly Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.total_leads || 0}</div>
            <p className="text-xs text-muted-foreground">Total leads generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.conversion_rate?.toFixed(1) || 0}%</div>
            <p className="text-xs text-muted-foreground">Leads to won ratio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{weeklyStats.total_value || 0}</div>
            <p className="text-xs text-muted-foreground">Won leads value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Source</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weeklyStats.leads_by_source ? Object.keys(weeklyStats.leads_by_source)[0] || 'N/A' : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Best performing channel</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Leads</CardTitle>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="won">Won</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div>
                    <p className="font-medium">{lead.date}</p>
                    <p className="text-sm text-gray-500">{lead.source}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">{lead.city_page}</p>
                    <p className="text-sm text-gray-500">City</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">{lead.service}</p>
                    <p className="text-sm text-gray-500">Service</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">£{lead.value}</p>
                    <p className="text-sm text-gray-500">{lead.contact_method}</p>
                  </div>
                  
                  <div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    {lead.status !== 'won' && lead.status !== 'lost' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(lead.id, 'won')}
                        >
                          Won
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(lead.id, 'lost')}
                        >
                          Lost
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No leads found for the selected status.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Review Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Review Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources">
            <TabsList>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="cities">Cities</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sources" className="space-y-4">
              {weeklyStats.leads_by_source && Object.entries(weeklyStats.leads_by_source).map(([source, count]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="capitalize">{source.replace('_', ' ')}</span>
                  <Badge variant="secondary">{count as number} leads</Badge>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="cities" className="space-y-4">
              {weeklyStats.leads_by_city && Object.entries(weeklyStats.leads_by_city).map(([city, count]) => (
                <div key={city} className="flex justify-between items-center">
                  <span className="capitalize">{city.replace('-', ' ')}</span>
                  <Badge variant="secondary">{count as number} leads</Badge>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4">
              {weeklyStats.leads_by_service && Object.entries(weeklyStats.leads_by_service).map(([service, count]) => (
                <div key={service} className="flex justify-between items-center">
                  <span>{service}</span>
                  <Badge variant="secondary">{count as number} leads</Badge>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}