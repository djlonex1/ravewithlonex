"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Start every fresh page load in dark mode
      setTheme("dark");

      setMounted(true);
    }
  }, [setTheme]);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-white/20" />
    );
  }

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="theme-toggle flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 transition hover:border-[#efff00] hover:text-[#efff00]"
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
