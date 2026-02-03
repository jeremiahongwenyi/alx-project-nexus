import { Truck, Shield, Phone, Palette } from "lucide-react";

const features = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Nationwide Delivery",
    description: "Fast and reliable delivery across Kenya",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality Guarantee",
    description: "Premium materials with warranty coverage",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Expert Support",
    description: "Chat with us on WhatsApp anytime",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Custom Orders",
    description: "Design your perfect piece with us",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
