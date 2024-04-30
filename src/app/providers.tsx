"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { RecoilRoot as RecoilProvider } from "recoil";

export default function Providers({ children }: PropsWithChildren) {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <RecoilProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </RecoilProvider>
  );
}
