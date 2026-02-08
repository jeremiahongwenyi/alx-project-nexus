import { useAppDispatch, useAppSelector } from "@/store";
import {
  setSortBy,
  setPriceRange,
  setInStockOnly,
  setSearchQuery,
  resetFilters,
  type SortOption,
} from "@/store/productSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { formatPrice } from "@/data/products";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
];

interface FilterControlsProps {
  totalResults: number;
}

export function FilterControls({ totalResults }: FilterControlsProps) {
  const dispatch = useAppDispatch();
  const { sortBy, priceRange, inStockOnly, searchQuery } = useAppSelector(
    (state) => state.products,
  );

  const hasActiveFilters =
    sortBy !== "default" ||
    priceRange.min > 0 ||
    priceRange.max < 500000 ||
    inStockOnly ||
    searchQuery.trim() !== "";

  const FilterContent = () => (
    <div className="space-y-6 px-4 ">
      {/* Search */}
      <div className="space-y-2">
        <Label>Search Products</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-9"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select
          value={sortBy}
          onValueChange={(value) => dispatch(setSortBy(value as SortOption))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={500000}
          step={5000}
          value={[priceRange.min, priceRange.max]}
          onValueChange={([min, max]) => dispatch(setPriceRange({ min, max }))}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange.min)}</span>
          <span>{formatPrice(priceRange.max)}</span>
        </div>
      </div>

      {/* In Stock Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={inStockOnly}
          onCheckedChange={(checked) =>
            dispatch(setInStockOnly(checked as boolean))
          }
        />
        <Label htmlFor="inStock" className="cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(resetFilters())}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{totalResults}</span>{" "}
        products
      </p>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Desktop: Inline sort */}
        <div className="hidden md:block">
          <Select
            value={sortBy}
            onValueChange={(value) => dispatch(setSortBy(value as SortOption))}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search input - desktop */}
        <div className="hidden md:block relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-9"
          />
        </div>

        {/* Mobile: Filter sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop: Advanced filters popover */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
              {hasActiveFilters && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
