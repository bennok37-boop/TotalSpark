import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import carpetImage from '@assets/stock_images/professional_carpet__d09de93c.jpg';
import kitchenImage from '@assets/stock_images/professional_kitchen_2ae5ee29.jpg';
import livingRoomImage from '@assets/stock_images/clean_modern_living__9562ecd9.jpg';

const galleryItems = [
  {
    id: 1,
    beforeImage: carpetImage,
    afterImage: carpetImage,
    title: "Carpet Deep Clean",
    location: "Newcastle Family Home",
    service: "Carpet Cleaning"
  },
  {
    id: 2,
    beforeImage: kitchenImage,
    afterImage: kitchenImage,
    title: "Kitchen Restoration",
    location: "Leeds Apartment",
    service: "End of Tenancy"
  },
  {
    id: 3,
    beforeImage: livingRoomImage,
    afterImage: livingRoomImage,
    title: "Full Property Clean",
    location: "York Townhouse",
    service: "Deep Cleaning"
  }
];

export default function BeforeAfterGallery() {
  return (
    <section className="py-16" data-testid="section-before-after-gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real transformations from our recent cleaning projects across North East England.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-gallery-${item.id}`}>
              <div className="relative">
                {/* Before/After Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.beforeImage} 
                    alt={`Before and after: ${item.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Before/After Labels */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      Before & After
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-chart-2 text-white">
                      {item.service}
                    </Badge>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2" data-testid={`text-gallery-title-${item.id}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4" data-testid={`text-gallery-location-${item.id}`}>
                  {item.location}
                </p>
                
                {/* Results */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completion Time:</span>
                    <span className="font-medium">4 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customer Rating:</span>
                    <span className="font-medium text-yellow-600">★★★★★</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
            <div className="text-muted-foreground text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">48hrs</div>
            <div className="text-muted-foreground text-sm">Booking Response</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground text-sm">Deposit Returned</div>
          </div>
        </div>
      </div>
    </section>
  );
}