"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Share2, RefreshCw } from "lucide-react";
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

        const savedData = localStorage.getItem("multiverse_user_data");
        if (!savedData) {
            router.push("/input");
            return;
        }

        const parsedData = JSON.parse(savedData);
        setData(parsedData);
        hasFetched.current = true;

        const fetchStory = async () => {
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nickname: parsedData.nickname,
                        currentSituation: parsedData.currentSituation,
                        alternateChoice: parsedData.alternateChoice,
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
            <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-xl font-light text-muted-foreground animate-pulse text-center">
                    <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                        Multiverse Loading...
                    </span>
                    {t("result.loading")}
                </p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
            <Header />

            <div className="relative z-10 max-w-3xl w-full space-y-8 pt-20 animate-fade-in-up">

                {/* Header */}
                <div className="space-y-2 text-center">
                    <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full border border-purple-500/20 mb-2 font-mono">
                        Multiverse Story No. #824
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {data?.nickname}{t("result.title")}
                    </h1>
                    <p className="text-muted-foreground">
                        {t("result.choice")} <span className="text-foreground font-medium">{data?.alternateChoice}</span>
                    </p>
                </div>

                {/* Story Viewer */}
                <div className="bg-card p-8 rounded-3xl border border-border shadow-2xl shadow-purple-500/10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="prose dark:prose-invert prose-purple max-w-none leading-relaxed">
                        <ReactMarkdown>{story}</ReactMarkdown>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                        variant="secondary"
                        onClick={() => router.push("/input")}
                        className="gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {t("result.retry")}
                    </Button>

                    <Button
                        onClick={() => alert("Coming Soon!")}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-none"
                    >
                        <Share2 className="w-4 h-4" />
                        {t("result.share")}
                    </Button>
                </div>

            </div>
        </main>
    );
}
