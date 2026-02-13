"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star, Heart, DollarSign, Activity, Trophy, UserCircle, Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ad-banner";
import type { MultiverseStory } from "@/lib/types";

const MIN_LOADING_TIME = 5000; // 5초 최소 로딩 (광고 노출 보장)

export default function ResultPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState<MultiverseStory | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [messageIndex, setMessageIndex] = useState(0);
    const [showShareToast, setShowShareToast] = useState(false);
    const hasFetched = useRef(false);
    const loadingStartTime = useRef(Date.now());

    const loadingMessages = [
        t("result.loading.msg1"),
        t("result.loading.msg2"),
        t("result.loading.msg3"),
        t("result.loading.msg4"),
    ];

    // Rotate loading messages
    useEffect(() => {
        if (!isLoading) return;
        const interval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % 4);
        }, 2500);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (hasFetched.current) return;

        const inputStr = localStorage.getItem("multiverse_input");

        if (!inputStr) {
            router.push("/profile");
            return;
        }

        const inputData = JSON.parse(inputStr);
        hasFetched.current = true;
        loadingStartTime.current = Date.now();

        const fetchStory = async () => {
            try {
                const response = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inputData),
                });

                if (!response.ok) {
                    throw new Error("Failed to generate story");
                }

                const data = await response.json();

                // Ensure minimum loading time for ad impression
                const elapsed = Date.now() - loadingStartTime.current;
                const remaining = MIN_LOADING_TIME - elapsed;
                if (remaining > 0) {
                    await new Promise(resolve => setTimeout(resolve, remaining));
                }

                setStory(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error generating story:", error);
                setError(t("result.error"));
                setIsLoading(false);
            }
        };

        fetchStory();
    }, [router, t]);

    const handleShare = async () => {
        if (!story) return;
        const inputStr = localStorage.getItem("multiverse_input");
        const nickname = inputStr ? JSON.parse(inputStr).nickname : "";
        const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

        const shareText = [
            `[${story.universe_id}] ${story.world_name}`,
            "",
            story.core_difference,
            "",
            t("result.share.service"),
            siteUrl,
        ].join("\n");

        try {
            await navigator.clipboard.writeText(shareText);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        } catch {
            // fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 3000);
        }
    };

    if (error) {
        return (
            <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh] bg-background text-foreground space-y-4">
                <h2 className="text-xl font-bold">{error}</h2>
                <Button onClick={() => router.push("/profile")} variant="outline">
                    {t("result.retry")}
                </Button>
            </main>
        );
    }

    if (isLoading || !story) {
        return (
            <main className="flex-1 flex flex-col items-center justify-start min-h-screen bg-background text-foreground">
                <Header />
                <div className="w-full max-w-lg px-6 pt-32 space-y-10 animate-fade-in-up">
                    {/* Loading Animation */}
                    <div className="text-center space-y-4">
                        <Loader2 className="w-14 h-14 text-primary animate-spin mx-auto" />
                        <div className="space-y-2 min-h-[80px]">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 block transition-all duration-500">
                                {loadingMessages[messageIndex]}
                            </span>
                            <p className="text-sm text-muted-foreground">{t("result.loading")}</p>
                        </div>
                    </div>

                    {/* Ad Banner during loading */}
                    <AdBanner
                        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING || ""}
                        format="rectangle"
                        className="flex justify-center"
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full max-w-2xl px-6 pt-24 space-y-10 animate-fade-in-up">

                {/* Report Header */}
                <div className="border-b border-border/50 pb-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-mono font-bold uppercase tracking-wider rounded-md">
                            {story.universe_id}
                        </span>
                        <span className="text-sm text-muted-foreground font-mono">CONFIDENTIAL</span>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 break-keep">
                            {story.world_name}
                        </h1>
                        <p className="text-xl text-foreground/80 font-medium italic leading-relaxed break-keep">
                            &ldquo;{story.one_line_summary}&rdquo;
                        </p>
                    </div>

                    {/* Core Difference Card */}
                    <div className="p-6 bg-secondary/30 rounded-2xl border border-border/50">
                        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wide block mb-2">Core Difference</span>
                        <p className="font-medium text-foreground text-lg leading-relaxed break-keep">{story.core_difference}</p>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-primary" />
                        {t("result.profile.title")}
                    </h2>
                    <div className="grid grid-cols-2 gap-6 text-base">
                        <ProfileItem label={t("result.profile.age")} value={story.profile.age} />
                        <ProfileItem label={t("result.profile.job")} value={story.profile.job} />
                        <ProfileItem label={t("result.profile.residence")} value={story.profile.residence} />
                        <ProfileItem label={t("result.profile.worry")} value={story.profile.main_worry} isLong />
                    </div>
                    <div className="bg-secondary/20 p-6 rounded-2xl space-y-4">
                        <h3 className="text-base font-bold text-muted-foreground uppercase">{t("result.routine.title")}</h3>
                        <div className="grid gap-4 text-base">
                            <RoutineItem time={t("result.routine.morning")} text={story.profile.routine.morning} />
                            <RoutineItem time={t("result.routine.afternoon")} text={story.profile.routine.afternoon} />
                            <RoutineItem time={t("result.routine.night")} text={story.profile.routine.night} />
                        </div>
                    </div>
                    <blockquote className="border-l-4 border-primary/50 pl-6 py-2 italic text-muted-foreground text-lg leading-relaxed">
                        &ldquo;{story.profile.self_description}&rdquo;
                    </blockquote>
                </div>

                {/* Stats Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Activity className="w-6 h-6 text-primary" />
                        {t("result.stats.title")}
                    </h2>
                    <div className="grid grid-cols-5 gap-3">
                        <StatItem icon={<DollarSign className="w-5 h-5" />} label={t("result.stats.wealth")} value={story.stats.wealth} />
                        <StatItem icon={<Star className="w-5 h-5" />} label={t("result.stats.fame")} value={story.stats.reputation} />
                        <StatItem icon={<Heart className="w-5 h-5" />} label={t("result.stats.love")} value={story.stats.love} />
                        <StatItem icon={<Activity className="w-5 h-5" />} label={t("result.stats.health")} value={story.stats.health} />
                        <StatItem icon={<Trophy className="w-5 h-5" />} label={t("result.stats.joy")} value={story.stats.happiness} />
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold">{t("result.timeline.title")}</h2>
                    <div className="space-y-0 relative border-l-2 border-border/50 ml-3 md:ml-6 pl-8 md:pl-10 pb-4">
                        {story.timeline.map((event, idx) => (
                            <div key={idx} className="relative mb-10 last:mb-0">
                                <div className="absolute -left-[39px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-background border-4 border-primary" />
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                                    <span className="font-mono text-sm font-bold text-primary">{event.year} ({t("result.profile.age")} {event.age})</span>
                                </div>
                                <p className="text-base text-foreground/90 leading-relaxed break-keep">{event.event}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Moments Section */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold">{t("result.moments.title")}</h2>
                    <div className="grid gap-6">
                        {story.moments.map((moment, idx) => (
                            <div key={idx} className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-xl mb-3 text-foreground break-keep">{moment.title}</h3>
                                <p className="text-base leading-loose text-muted-foreground whitespace-pre-wrap break-keep">{moment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Full Story Section */}
                {story.full_story && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold">{t("result.story.title")}</h2>
                        <div className="p-8 bg-secondary/10 border border-primary/10 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary/50 to-pink-500/50" />
                            <p className="text-lg leading-loose text-foreground/90 break-keep whitespace-pre-wrap font-medium">
                                {story.full_story}
                            </p>
                        </div>
                    </div>
                )}

                {/* Analysis Section */}
                <div className="grid md:grid-cols-2 gap-8 pt-6">
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-muted-foreground uppercase">{t("result.analysis.gained")}</h3>
                        <ul className="space-y-2">
                            {story.analysis.gained.map((item, i) => (
                                <li key={i} className="text-base flex items-start gap-3">
                                    <span className="text-green-500 font-bold text-lg leading-none">+</span>
                                    <span className="break-keep leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-base font-bold text-muted-foreground uppercase">{t("result.analysis.lost")}</h3>
                        <ul className="space-y-2">
                            {story.analysis.lost.map((item, i) => (
                                <li key={i} className="text-base flex items-start gap-3">
                                    <span className="text-red-500 font-bold text-lg leading-none">-</span>
                                    <span className="break-keep leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Message Section */}
                <div className="py-12 text-center space-y-6">
                    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{story.universe_id} {t("result.message.title")}</h2>
                    <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-foreground break-keep">
                        &ldquo;{story.message_to_reality}&rdquo;
                    </p>
                </div>

                {/* Teaser */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                    <p className="text-sm font-bold text-primary mb-2">NEXT EPISODE?</p>
                    <p className="text-base font-medium break-keep">{story.teaser}</p>
                </div>

            </div>

            {/* Share Toast */}
            {showShareToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowShareToast(false)} />
                    <div className="relative bg-background border border-border rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 animate-fade-in-up">
                        <div className="flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <p className="text-center text-base font-medium leading-relaxed break-keep">
                            {(() => {
                                const inputStr = localStorage.getItem("multiverse_input");
                                const nickname = inputStr ? JSON.parse(inputStr).nickname : "";
                                return nickname + t("result.share.copied");
                            })()}
                        </p>
                        <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => setShowShareToast(false)}
                        >
                            {t("result.share.close")}
                        </Button>
                    </div>
                </div>
            )}

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] z-40">
                <div className="w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
                <div className="p-6 pb-8">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => router.push("/profile")}
                            className="w-full text-lg h-14 font-bold rounded-xl"
                        >
                            {t("result.retry")}
                        </Button>

                        <Button
                            size="lg"
                            onClick={handleShare}
                            className="w-full text-lg h-14 font-bold rounded-xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
                        >
                            {t("result.share")}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ProfileItem({ label, value, isLong }: { label: string, value: string | number, isLong?: boolean }) {
    return (
        <div className={`flex flex-col ${isLong ? 'col-span-2' : ''}`}>
            <span className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">{label}</span>
            <span className={`font-medium break-keep leading-snug ${isLong ? 'text-base' : 'text-base truncate'}`}>{value}</span>
        </div>
    );
}

function RoutineItem({ time, text }: { time: string, text: string }) {
    return (
        <div className="flex gap-3">
            <span className="text-xs font-bold w-16 shrink-0 text-muted-foreground">{time}</span>
            <span className="text-foreground/90">{text}</span>
        </div>
    );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-lg">
            <div className={`p-1.5 rounded-full ${value > 70 ? 'bg-green-100 text-green-600' : value < 40 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">{label}</span>
            <span className="text-sm font-bold">{value}</span>
        </div>
    );
}
