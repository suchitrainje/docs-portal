"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  return (
    <aside
      data-testid="sidebar-navigation"
      className="w-64 border-r p-4 bg-gray-50 dark:bg-gray-950"
    >
      <nav className="flex flex-col gap-2">

        {/* Docs Links */}
        <Link href={`/${locale}/docs/v1/introduction`}>
          Introduction (v1)
        </Link>

        <Link href={`/${locale}/docs/v1/getting-started`}>
          Getting Started (v1)
        </Link>

        <Link href={`/${locale}/docs/v2/introduction`}>
          Introduction (v2)
        </Link>

        <Link href={`/${locale}/docs/v3/introduction`}>
          Introduction (v3)
        </Link>

        <hr className="my-4" />

        {/* API Reference */}
        <Link href="/api-reference">
          API Reference
        </Link>

      </nav>
    </aside>
  );
}