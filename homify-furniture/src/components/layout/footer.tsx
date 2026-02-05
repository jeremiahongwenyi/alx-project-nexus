import  Link  from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SELLER_WHATSAPP } from "@/data/products";


export default function Footer (){
  return (
    <footer className="bg-primary px-4  text-primary-foreground mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-bold">Homify Furniture</Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Custom comfort for modern living. Premium furniture crafted for
              your unique lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/products" className="hover:text-primary-foreground transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/customorders" className="hover:text-primary-foreground transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                {/* <Link href="/faq" className="hover:text-primary-foreground transition-colors">
                  FAQs
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/products?category=sofas" className="hover:text-primary-foreground transition-colors">
                  Sofas & Couches
                </Link>
              </li>
              <li>
                <Link href="/products?category=beds" className="hover:text-primary-foreground transition-colors">
                  Beds & Mattresses
                </Link>
              </li>
              <li>
                <Link href="/products?category=dining" className="hover:text-primary-foreground transition-colors">
                  Dining Furniture
                </Link>
              </li>
              <li>
                <Link href="/products?category=office" className="hover:text-primary-foreground transition-colors">
                  Office Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Ruiru, Kiambu County, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{SELLER_WHATSAPP}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@homifyfurniture.co.ke</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} UrbanNest Furniture. All rights reserved.</p>
          <div className="flex gap-6">
            {/* <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

