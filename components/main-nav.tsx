"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <div className="bg-foreground dark:bg-black m-1 border-0 rounded">
          <Image
            className="h-12 w-12 p-1"
            src="/hb-logo-vertical-white.png"
            width={80}
            height={80}
            alt="Logo"
          />
        </div>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard"
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/inventory"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/inventory")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Inventory
        </Link>
        <Link
          href="/reports"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Reports
        </Link>
      </nav>
    </div>
  );
}
