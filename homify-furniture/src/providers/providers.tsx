// app/providers.tsx
"use client";

import { Toaster } from "sonner";
import { ReduxProvider } from "./ReduxProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes 
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        {children}

        <Toaster position="top-right" richColors closeButton theme="system" />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
