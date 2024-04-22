"use client";

import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
