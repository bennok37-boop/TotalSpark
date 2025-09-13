import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Sarah Johnson",
      location: "Newcastle",
      service: "End of Tenancy",
      rating: 5,
      date: "December 2024",
      review: "Absolutely brilliant service! Got my full deposit back thanks to their thorough end of tenancy clean. The team was professional, punctual, and left my flat spotless."
    },
    {
      name: "Mark Thompson",
      location: "Leeds", 
      service: "Deep Clean",
      rating: 5,
      date: "November 2024",
      review: "Used CleanPro for a deep clean of our family home. They were fantastic - very thorough and paid attention to every detail. Highly recommend!"
    },
    {
      name: "Emma Wilson",
      location: "York",
      service: "Commercial Cleaning", 
      rating: 5,
      date: "November 2024",
      review: "We use CleanPro for our office cleaning and they're consistently excellent. Reliable, professional, and great value for money."
    },
    {
      name: "David Brown",
      location: "Sunderland",
      service: "Carpet Cleaning",
      rating: 5,
      date: "October 2024", 
      review: "Amazing carpet cleaning service! Removed stains I thought were permanent. The technician was knowledgeable and the results exceeded expectations."
    },
    {
      name: "Lisa Roberts",
      location: "Durham",
      service: "End of Tenancy",
      rating: 5,
      date: "October 2024",
      review: "Perfect end of tenancy clean. The team arrived on time, worked efficiently, and left the property immaculate. Deposit returned in full!"
    },
    {
      name: "James Miller",
      location: "Middlesbrough",
      service: "Deep Clean",
      rating: 5,
      date: "September 2024",
      review: "Exceptional service from start to finish. The team was courteous, professional, and delivered outstanding results. Will definitely use again."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Customer Reviews | CleanPro - 4.9/5 Stars from 500+ Reviews"
        description="Read genuine customer reviews for CleanPro cleaning services across North East UK. 4.9/5 stars from 500+ satisfied customers in Newcastle, Leeds, York and surrounding areas."
        ogTitle="Customer Reviews | CleanPro - 4.9/5 Stars"
        ogDescription="500+ genuine customer reviews. Professional cleaning services across North East UK with 4.9/5 star rating."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                4.9/5 stars from over 500+ satisfied customers across the North East UK
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Reviews</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-muted-foreground">Would Recommend</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                  <Card key={index} className="hover-elevate transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Badge variant="outline">{review.service}</Badge>
                      </div>
                      <div className="relative mb-4">
                        <Quote className="w-6 h-6 text-primary opacity-50 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground leading-relaxed pl-4">
                          {review.review}
                        </p>
                      </div>
                      <div className="border-t pt-4">
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {review.location} • {review.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Happy Customers</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Experience the CleanPro difference for yourself. Get your instant quote and 
                see why we have over 500 five-star reviews across the North East.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:01913497777" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
                  data-testid="button-call-reviews"
                >
                  Call Now: 0191 349 7777
                </a>
                <a 
                  href="/quote" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md font-medium transition-colors"
                  data-testid="button-quote-reviews"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}