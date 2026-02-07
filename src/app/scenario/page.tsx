"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ScenarioPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [alternateChoice, setAlternateChoice] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if base info exists, if not redirect to profile
        const savedData = localStorage.getItem("multiverse_base_info");
        if (!savedData) {
            router.push("/profile");
            return;
        }
        // Note: We do NOT load alternateChoice from localStorage to ensure it's "fresh" input
        setIsLoading(false);
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save scenario info temporarily just for the result generation
        localStorage.setItem("multiverse_scenario_info", JSON.stringify({ alternateChoice }));
        router.push("/result");
    };

    if (isLoading) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/5 rounded-full blur-3xl opacity-100" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl opacity-100" />
            </div>

            <Header />

            <div className="relative z-10 max-w-xl w-full space-y-8 pt-20 animate-fade-in-up">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                        {t("input.alternateChoice")}
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                        {t("landing.feature.choice.desc")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-3xl border border-border shadow-xl shadow-pink-500/5">

                    <div className="space-y-2">
                        <Textarea
                            id="alternateChoice"
                            name="alternateChoice"
                            required
                            rows={6}
                            value={alternateChoice}
                            onChange={(e) => setAlternateChoice(e.target.value)}
                            className="border-primary/30 bg-primary/5 focus-visible:ring-primary text-lg p-6"
                            placeholder="e.g. What if I hadn't quit my job back then?"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-none">
                        {t("input.submit")}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
        </main>
    );
}
