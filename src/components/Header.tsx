"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Extract URL parts
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const currentVersion = segments[3] || "v1";

  // Change Language
  const changeLanguage = (locale: string) => {
    const newSegments = [...segments];
    newSegments[1] = locale;
    router.push(newSegments.join("/"));
  };

  // Change Version
  const changeVersion = (version: string) => {
    const newSegments = [...segments];
    newSegments[3] = version;
    router.push(newSegments.join("/"));
  };

  return (
    <header className="w-full border-b p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-900">
      <h1 className="font-bold text-lg">Docs Portal</h1>

      <div className="flex gap-4 items-center">
        
        {/* Language Switcher */}
        <select
          data-testid="language-switcher"
          value={currentLocale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border px-2 py-1 rounded bg-white dark:bg-gray-800"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>

        {/* Version Selector */}
        <select
          data-testid="version-selector"
          value={currentVersion}
          onChange={(e) => changeVersion(e.target.value)}
          className="border px-2 py-1 rounded bg-white dark:bg-gray-800"
        >
          <option value="v1">v1</option>
          <option value="v2">v2</option>
          <option value="v3">v3</option>
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