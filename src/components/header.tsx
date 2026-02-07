"use client";

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";

    return (
        <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
            <div className="flex items-center gap-2">
                {!isHome && (
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2 rounded-full w-10 h-10 p-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                )}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-lg hidden sm:block">Multiverse Story</span>
                </Link>
            </div>
            <div className="flex gap-2">
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </header>
    );
}
