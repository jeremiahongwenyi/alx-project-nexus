import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type CategoryId } from "@/types/product";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating";
export type ViewMode = "pagination" | "infinite";

interface PriceRange {
  min: number;
  max: number;
}

interface ProductsState {
  selectedCategory: CategoryId;
  sortBy: SortOption;
  priceRange: PriceRange;
  inStockOnly: boolean;
  searchQuery: string;
  viewMode: ViewMode;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  selectedCategory: "all",
  sortBy: "default",
  priceRange: { min: 0, max: 10000 },
  inStockOnly: false,
  searchQuery: "",
  viewMode: "pagination",
  currentPage: 1,
  itemsPerPage: 12,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryId>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page
      console.log('selectedCategory', action.payload);
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.currentPage = 1; // Reset to first page
      console.log('sortBy', action.payload);
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
      state.currentPage = 1; // Reset to first page
      console.log('priceRange', action.payload);
    },
    setInStockOnly: (state, action: PayloadAction<boolean>) => {
      state.inStockOnly = action.payload;
      state.currentPage = 1; // Reset to first page
      console.log('inStockOnly', action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page
      console.log('searchQuery', action.payload);   
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
      console.log('viewMode', action.payload);   
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    resetFilters: (state) => {
      console.log("Resetting filters");
      state.selectedCategory = "all";
      state.sortBy = "default";
      state.priceRange = { min: 0, max: 10000 };
      state.inStockOnly = false;
      state.searchQuery = "";
      state.viewMode = "pagination";
      state.currentPage = 1;
      state.itemsPerPage = 12;
    },
  },
});

export const {
  setCategory,
  setSortBy,
  setPriceRange,
  setInStockOnly,
  setSearchQuery,
  setViewMode,
  setCurrentPage,
  setItemsPerPage,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
