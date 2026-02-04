import React from 'react';
import { PackageOpen } from "lucide-react";

export default function EmptyState() {
   return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="font-semibold text-lg mb-2">No products found</h3>
      <p className="text-muted-foreground">
        Try adjusting your filters or check back later.
      </p>
    </div>
  );
}
