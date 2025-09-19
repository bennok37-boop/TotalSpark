import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  caption?: string;
  cityName: string;
  serviceName: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  title,
  caption,
  cityName,
  serviceName
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value));
  };

  return (
    <Card className="relative overflow-hidden group hover-elevate" data-testid={`card-before-after-${cityName.toLowerCase()}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-muted">
          {/* After Image (Background) */}
          <img
            src={afterSrc}
            alt={`${serviceName} after cleaning in ${cityName}`}
            className="absolute inset-0 w-full h-full object-cover"
            data-testid={`img-after-${cityName.toLowerCase()}`}
          />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={beforeSrc}
              alt={`${serviceName} before cleaning in ${cityName}`}
              className="w-full h-full object-cover"
              data-testid={`img-before-${cityName.toLowerCase()}`}
            />
          </div>

          {/* Slider Control */}
          <div className="absolute inset-0">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
              data-testid={`slider-${cityName.toLowerCase()}`}
            />
            
            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Before/After Labels */}
          <Badge 
            className="absolute top-4 left-4 bg-black/80 text-white border-none"
            data-testid={`badge-before-${cityName.toLowerCase()}`}
          >
            BEFORE
          </Badge>
          <Badge 
            className="absolute top-4 right-4 bg-white/90 text-black border-none"
            data-testid={`badge-after-${cityName.toLowerCase()}`}
          >
            AFTER
          </Badge>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" data-testid={`text-title-${cityName.toLowerCase()}`}>
            {title}
          </h3>
          {caption && (
            <p className="text-muted-foreground text-sm" data-testid={`text-caption-${cityName.toLowerCase()}`}>
              {caption}
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <Badge variant="secondary" data-testid={`badge-city-${cityName.toLowerCase()}`}>
              {cityName}
            </Badge>
            <Badge variant="outline" data-testid={`badge-service-${serviceName.toLowerCase().replace(/\s+/g, '-')}`}>
              {serviceName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}