import { Shield, Award, Clock, CheckCircle } from 'lucide-react';
// import trustBadge from '@assets/generated_images/DBS_trust_badge_dc15542d.png';
const trustBadge = '/attached_assets/generated_images/DBS_trust_badge_dc15542d.png';

const proofPoints = [
  {
    icon: Shield,
    text: "DBS-Checked",
    description: "All staff vetted"
  },
  {
    icon: Award,
    text: "Fully Insured",
    description: "£2M public liability"
  },
  {
    icon: CheckCircle,
    text: "Deposit-Back Guarantee",
    description: "100% satisfaction or money back"
  },
  {
    icon: Clock,
    text: "Available 7 Days",
    description: "Flexible scheduling"
  }
];

export default function ProofStrip() {
  return (
    <section className="bg-muted py-8" data-testid="section-proof-strip">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {proofPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div key={index} className="flex items-center space-x-3 text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm md:text-base">
                    {point.text}
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    {point.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="flex justify-center mt-8">
          <img 
            src={trustBadge} 
            alt="DBS Checked and Fully Insured Badge"
            className="h-16 w-auto"
            data-testid="img-trust-badge"
          />
        </div>

        {/* Social Proof */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">1,000+</strong> satisfied customers across North East England
          </p>
        </div>
      </div>
    </section>
  );
}