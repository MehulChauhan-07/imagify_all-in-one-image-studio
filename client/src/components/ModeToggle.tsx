"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative group overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Light mode icon */}
        <Sun
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          } ${isAnimating ? "animate-pulse" : ""}`}
        />

        {/* Dark mode icon */}
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          } ${isAnimating ? "animate-spin" : ""}`}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 dark:from-blue-400/0 dark:via-blue-400/20 dark:to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
