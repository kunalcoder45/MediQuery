"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { Toaster } from "@/components/ui/toaster";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname === "/chat";

  return (
    <>
      <AppHeader />
      <main className="w-full">
        {children}
      </main>
      {!hideFooter && <AppFooter />}
      <Toaster />
    </>
  );
}
