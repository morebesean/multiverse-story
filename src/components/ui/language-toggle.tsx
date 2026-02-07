"use client";

import * as React from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold"
            onClick={() => setLanguage(language === "en" ? "ko" : "en")}
        >
            {language === "en" ? "EN" : "KO"}
        </Button>
    );
}
