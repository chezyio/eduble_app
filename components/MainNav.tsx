"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
    const pathname = usePathname();

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">Eduble</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                <Link
                    href="/"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/docs"
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    Guide
                </Link>
                <Link
                    href="/"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/docs/components")
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    About
                </Link>
            </nav>
        </div>
    );
}
