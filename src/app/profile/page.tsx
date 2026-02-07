"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Save, UserCircle } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        nickname: "",
        currentSituation: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedData = localStorage.getItem("multiverse_base_info");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
        setIsLoading(false);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("multiverse_base_info", JSON.stringify(formData));
        router.push("/scenario");
    };

    if (isLoading) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full px-6 pt-24 space-y-8 animate-fade-in-up">

                {/* Title Section with Badge */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                        <UserCircle className="w-3 h-3" />
                        Basic Profile
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 pb-1">
                            {t("input.title")}
                        </h2>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed mt-2">
                            {t("landing.feature.profile.desc").split('\n')[1] || t("landing.feature.profile.desc")}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form id="profile-form" onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label htmlFor="nickname" className="text-sm font-semibold ml-1 text-foreground flex items-center gap-2">
                            {t("input.nickname")}
                            <span className="text-xs font-normal text-muted-foreground">* Required</span>
                        </label>
                        <Input
                            id="nickname"
                            name="nickname"
                            required
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="Ex. Hong Gil-dong"
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background text-lg py-6 rounded-2xl transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="currentSituation" className="text-sm font-semibold ml-1 text-foreground">
                            {t("input.currentSituation")}
                        </label>
                        <Textarea
                            id="currentSituation"
                            name="currentSituation"
                            required
                            rows={6}
                            value={formData.currentSituation}
                            onChange={handleChange}
                            placeholder="Ex. I've been working as a developer for 3 years, but I'm thinking of starting a bakery..."
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background text-lg leading-relaxed p-6 min-h-[150px] resize-none rounded-2xl transition-all"
                        />
                    </div>
                </form>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] z-40">
                <div className="w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
                <div className="p-6 pb-8">
                    <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium animate-pulse">
                            <Save className="w-3.5 h-3.5" />
                            {t("input.save")}
                        </div>
                        <Button
                            type="submit"
                            form="profile-form"
                            size="lg"
                            className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20"
                        >
                            {t("landing.feature.choice")}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
