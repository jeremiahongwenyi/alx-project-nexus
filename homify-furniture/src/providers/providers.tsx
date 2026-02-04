// app/providers.tsx
"use client";

import { Toaster } from "sonner";
import { ReduxProvider } from "./ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}

      <Toaster position="top-right" richColors closeButton theme="system" />
    </ReduxProvider>
  );
}
