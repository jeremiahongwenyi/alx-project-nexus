import Link  from "next/link";
import { categories } from "@/data/products";
import { Sofa, BedDouble, UtensilsCrossed, Briefcase, Archive, Trees } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  sofas: <Sofa className="h-8 w-8" />,
  beds: <BedDouble className="h-8 w-8" />,
  dining: <UtensilsCrossed className="h-8 w-8" />,
  office: <Briefcase className="h-8 w-8" />,
  cabinets: <Archive className="h-8 w-8" />,
  outdoor: <Trees className="h-8 w-8" />,
};

export default function CategorySection() {
  const displayCategories = categories.filter(
    (cat) => cat.id !== "all" && cat.id !== "custom"
  );

  return (
    <section className="py-16 px-4  md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive collection organized by room and style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group bg-card p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {categoryIcons[category.id]}
              </div>
              <h3 className="font-medium text-sm">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
