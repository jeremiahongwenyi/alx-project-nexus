import { categories } from "@/data/products";
import { type CategoryId } from "@/types/product";
import { cn } from "@/lib/utils";

interface CategoryBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
}

export function CategoryBar({
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  const allCategories = [
    { id: "all" as const, name: "All Products" },
    ...categories.filter((c) => c.id !== "all"),
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 px-4">
      <div className="flex gap-2 md:gap-3 min-w-max px-1">
        {allCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "category-pill whitespace-nowrap",
              selectedCategory === category.id && "category-pill-active",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
