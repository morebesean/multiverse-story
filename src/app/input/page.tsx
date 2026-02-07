"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Save } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function InputPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        nickname: "",
        currentSituation: "",
        alternateChoice: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedData = localStorage.getItem("multiverse_user_data");
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
        localStorage.setItem("multiverse_user_data", JSON.stringify(formData));
        router.push("/result");
    };

    if (isLoading) return null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl opacity-30" />
            </div>

            <Header />

            <div className="relative z-10 max-w-xl w-full space-y-8 pt-20 animate-fade-in-up">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                        {t("input.title")}
                    </h2>
                    <p className="text-muted-foreground">
                        {t("input.subtitle")}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-3xl border border-border shadow-xl shadow-purple-500/5">

                    <div className="space-y-2">
                        <label htmlFor="nickname" className="text-sm font-medium ml-1">
                            {t("input.nickname")}
                        </label>
                        <Input
                            id="nickname"
                            name="nickname"
                            required
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="currentSituation" className="text-sm font-medium ml-1">
                            {t("input.currentSituation")}
                        </label>
                        <Textarea
                            id="currentSituation"
                            name="currentSituation"
                            required
                            rows={3}
                            value={formData.currentSituation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="alternateChoice" className="text-sm font-medium text-purple-500 ml-1">
                            {t("input.alternateChoice")}
                        </label>
                        <Textarea
                            id="alternateChoice"
                            name="alternateChoice"
                            required
                            rows={3}
                            value={formData.alternateChoice}
                            onChange={handleChange}
                            className="border-purple-500/30 bg-purple-500/5 focus-visible:ring-purple-500"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full group">
                        {t("input.submit")}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>

                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Save className="w-3 h-3" />
                    {t("input.save")}
                </p>
            </div>
        </main>
    );
}
