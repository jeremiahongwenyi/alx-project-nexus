import { MapPin, Phone, Mail, Clock, Heart, Truck, Shield } from "lucide-react";

const About = () => {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              About Homify Furniture
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crafting premium furniture for modern Kenyan homes since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-primary mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We are <strong className="text-foreground">Homify Furniture</strong>, a proudly Kenyan furniture company dedicated to transforming houses into homes. Founded in 2018, we started with a simple vision: to provide high-quality, beautifully crafted furniture that combines modern design with African craftsmanship.
              </p>
              <p>
                Our journey began in a small workshop in Ruiru, where our founder noticed a gap in the market for affordable yet premium furniture that truly reflects the Kenyan lifestyle. Today, we've grown into one of the most trusted furniture brands in the region, serving thousands of happy customers across Kenya.
              </p>
              <p>
                At Homify Furniture, we believe that every piece of furniture tells a story. Our team of skilled artisans combines traditional woodworking techniques with contemporary design to create pieces that are not just functional, but works of art. We source our materials locally whenever possible, supporting Kenyan suppliers and ensuring sustainability in our production process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-primary text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                Every piece is handcrafted with attention to detail, using premium materials that stand the test of time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Nationwide Delivery</h3>
              <p className="text-muted-foreground">
                We deliver to all corners of Kenya, with special rates for Nairobi and surrounding areas.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Warranty Guaranteed</h3>
              <p className="text-muted-foreground">
                All our furniture comes with a comprehensive warranty, giving you peace of mind with every purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-primary mb-8 text-center">
              Visit Our Showroom
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Our Location
                </h3>
                <div className="text-muted-foreground space-y-2">
                  <p className="font-medium text-foreground">Homify Furniture Showroom</p>
                  <p>Wataalam, Ruiru</p>
                  <p>Along Kamiti Road</p>
                  <p>Kiambu County, Kenya</p>
                </div>
                <div className="pt-4">
                  <a 
                    href="https://maps.google.com/?q=Wataalam+Ruiru+Kenya+Kamiti+Road" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold">Contact Us</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href="tel:+254712345678" className="hover:text-primary transition-colors">
                      +254719352072
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href="mailto:hello@urbannest.co.ke" className="hover:text-primary transition-colors">
                     contact@homifyfurniture.co.ke
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Business Hours</p>
                      <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
