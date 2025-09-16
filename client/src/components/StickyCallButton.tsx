import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

interface StickyCallButtonProps {
  phoneNumber?: string;
  whatsappNumber?: string;
}

export default function StickyCallButton({ 
  phoneNumber = "0191 821 4567",
  whatsappNumber = "447380991629"
}: StickyCallButtonProps) {
  return (
    <>
      {/* Mobile Call Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 md:hidden">
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a quote for cleaning services`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors"
          data-testid="button-whatsapp-sticky"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a 
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-colors"
          data-testid="button-call-sticky"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {/* Desktop Call Strip */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Need help? Call us now!</span>
              </div>
              <span className="text-primary-foreground/80 text-sm">
                Available 7 days a week • Free quotes
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md transition-colors"
                data-testid="button-call-strip"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">{phoneNumber}</span>
              </a>
              
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a quote for cleaning services`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
                data-testid="button-whatsapp-strip"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for desktop to prevent content overlap */}
      <div className="hidden md:block h-16"></div>
    </>
  );
}