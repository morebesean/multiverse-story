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
        const savedData = localStorage.getItem("multiverse_base_info");
        if (!savedData) {
            router.push("/profile");
            return;
        }
        setIsLoading(false);
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("multiverse_scenario_info", JSON.stringify({ alternateChoice }));
        router.push("/result");
    };

    if (isLoading) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-32">
            <Header />

            <div className="w-full px-6 pt-4 space-y-8 animate-fade-in-up">

                {/* Title Section */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Scenario Input
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 pb-1">
                            {t("input.alternateChoice")}
                        </h2>
                        <p className="text-muted-foreground whitespace-pre-line mt-2 leading-relaxed">
                            {t("landing.feature.choice.desc")}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form id="scenario-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Textarea
                            id="alternateChoice"
                            name="alternateChoice"
                            required
                            rows={8}
                            value={alternateChoice}
                            onChange={(e) => setAlternateChoice(e.target.value)}
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background text-lg p-6 leading-relaxed resize-none rounded-2xl"
                            placeholder="Ex. What if I hadn't quit my job back then? I might be a CEO by now..."
                        />
                    </div>
                </form>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] p-6 bg-background/80 backdrop-blur-xl border-t border-border z-40">
                <Button
                    type="submit"
                    form="scenario-form"
                    size="lg"
                    className="w-full text-lg h-14 font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-none shadow-xl shadow-pink-500/20"
                >
                    {t("input.submit")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </main>
    );
}
