"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Save } from "lucide-react";
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
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-36">
            <Header />

            <div className="w-full px-6 pt-4 space-y-8 animate-fade-in-up">

                {/* Title Section */}
                <div className="space-y-2 text-left">
                    <h2 className="text-3xl font-bold text-foreground">
                        {t("input.title")}
                    </h2>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {t("landing.feature.profile.desc").split('\n')[1] || t("landing.feature.profile.desc")}
                    </p>
                </div>

                {/* Form Section */}
                <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <label htmlFor="nickname" className="text-sm font-semibold ml-1 text-foreground">
                            {t("input.nickname")}
                        </label>
                        <Input
                            id="nickname"
                            name="nickname"
                            required
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="Ex. Hong Gil-dong"
                            className="bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 text-lg py-6"
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
                            placeholder="Ex. I've been working as a developer for 3 years, but..."
                            className="bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 text-base leading-relaxed p-4 min-h-[150px]"
                        />
                    </div>
                </form>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] p-6 bg-background/80 backdrop-blur-xl border-t border-border z-40">
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
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </main>
    );
}
