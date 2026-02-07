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

    // Route logic:
    // / (Landing) -> No Back
    // /profile (Step 2) -> Back to /
    // /scenario (Step 3) -> Back to /profile
    // /result (Step 4) -> Home Logo (No Back)

    const isLanding = pathname === "/";
    const isProfile = pathname === "/profile";
    const isScenario = pathname === "/scenario";
    const isResult = pathname === "/result";

    const showBackButton = isProfile || isScenario;
    const showLogo = isLanding || isResult;

    // Custom back logic
    const handleBack = () => {
        if (isProfile) router.push("/");
        else if (isScenario) router.push("/profile");
        else router.back();
    };

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] p-6 flex justify-between items-center z-50 bg-background/0 backdrop-blur-[2px]">
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-transparent -z-10" />
            <div className="flex items-center gap-2">
                {showBackButton && (
                    <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2 rounded-full w-10 h-10 p-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                )}
                {showLogo && (
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg hidden sm:block">Multiverse Story</span>
                    </Link>
                )}
            </div>
            <div className="flex gap-2">
                <ThemeToggle />
                <LanguageToggle />
            </div>
        </header>
    );
}
