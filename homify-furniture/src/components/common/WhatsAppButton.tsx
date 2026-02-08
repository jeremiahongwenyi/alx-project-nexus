"use client";

import { MessageCircle } from "lucide-react";
import { SELLER_WHATSAPP } from "@/data/products";

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Format the WhatsApp number by removing + and spaces
    const phoneNumber = SELLER_WHATSAPP.replace(/\D/g, "");
    const message = "Hello! I'm interested in your furniture products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
