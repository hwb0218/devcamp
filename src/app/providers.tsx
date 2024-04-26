"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: PropsWithChildren) {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
