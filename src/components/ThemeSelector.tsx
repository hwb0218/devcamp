"use client";

import React from "react";

import { useTheme } from "next-themes";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function ThemeSelector() {
  const { setTheme, themes } = useTheme();

  return (
    <div className="absolute top-6 right-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="*:h-[1.2rem] *:w-[1.2rem]">
            <Sun className="rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {themes.map(theme => (
            <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
