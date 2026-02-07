"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function ResultPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState("");
    const [data, setData] = useState<any>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;

        // Load separated data
        const baseInfoStr = localStorage.getItem("multiverse_base_info");
        const scenarioInfoStr = localStorage.getItem("multiverse_scenario_info");

        if (!baseInfoStr) {
            router.push("/profile");
            return;
        }
        if (!scenarioInfoStr) {
            router.push("/scenario");
            return;
        }

        const baseInfo = JSON.parse(baseInfoStr);
        const scenarioInfo = JSON.parse(scenarioInfoStr);
        const combinedData = { ...baseInfo, ...scenarioInfo };

        setData(combinedData);
        hasFetched.current = true;

        const fetchStory = async () => {
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nickname: combinedData.nickname,
                        currentSituation: combinedData.currentSituation,
                        alternateChoice: combinedData.alternateChoice,
                    }),
                });

                if (!response.ok || !response.body) {
                    throw new Error("Failed to generate story");
                }

                setIsLoading(false);

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let done = false;

                while (!done) {
                    const { value, done: DONE } = await reader.read();
                    done = DONE;
                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });
                        setStory((prev) => prev + chunk);
                    }
                }
            } catch (error) {
                console.error("Error generating story:", error);
                alert("Error generating story");
                setIsLoading(false);
            }
        };

        fetchStory();
    }, [router]);

    if (isLoading) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
                <div className="text-center space-y-2">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 animate-pulse">
                        Generating Multiverse...
                    </span>
                    <p className="text-muted-foreground">{t("result.loading")}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full px-6 pt-24 space-y-6 animate-fade-in-up">

                {/* Header Information */}
                <div className="space-y-3 pb-6 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider rounded-md">
                            Multiverse #824
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold leading-tight">
                        <span className="text-primary">{data?.nickname}</span>{t("result.title")}
                    </h1>
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block mb-1">Choice</span>
                        <p className="font-medium text-foreground text-sm leading-relaxed">{data?.alternateChoice}</p>
                    </div>
                </div>

                {/* Story Text */}
                <div className="prose dark:prose-invert prose-base max-w-none leading-loose text-foreground/90">
                    <ReactMarkdown>{story}</ReactMarkdown>
                </div>

            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] z-40">
                <div className="w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
                <div className="p-6 pb-8">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => router.push("/scenario")}
                            className="w-full text-lg h-14 font-bold rounded-xl"
                        >
                            {t("result.retry")}
                        </Button>

                        <Button
                            size="lg"
                            onClick={() => alert("Coming Soon!")}
                            className="w-full text-lg h-14 font-bold rounded-xl"
                        >
                            {t("result.share")}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
