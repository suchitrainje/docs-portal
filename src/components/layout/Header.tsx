"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Search from "@/components/Search";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Language switch
  const changeLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <header className="w-full border-b p-4 flex justify-between items-center transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <h1 className="font-bold text-lg">Docs Portal</h1>

      <div className="flex gap-4 items-center">

        {/* Search */}
        <Search />

        {/* Language Switcher */}
        <select
          data-testid="language-switcher"
          className="border px-2 py-1 rounded bg-white dark:bg-gray-800"
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={pathname.split("/")[1]}
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>

        {/* Theme Toggle */}
        <button
          data-testid="theme-toggle"
          className="border px-3 py-1 rounded"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}