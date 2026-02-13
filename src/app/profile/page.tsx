"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        nickname: "",
        age: "",
        job: "",
        whatIf: "",
    });

    useEffect(() => {
        const savedData = localStorage.getItem("multiverse_input");
        if (savedData) {
            setFormData(prev => ({ ...prev, ...JSON.parse(savedData) }));
        }
        setIsLoading(false);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("multiverse_input", JSON.stringify(formData));
        router.push("/result");
    };

    if (isLoading) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full max-w-lg px-6 pt-24 space-y-8 animate-fade-in-up">

                {/* Title Section */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                        <Sparkles className="w-3 h-3" />
                        {t("input.badge")}
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 pb-1">
                        {t("input.title")}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t("input.subtitle")}
                    </p>
                </div>

                {/* Form Section */}
                <form id="input-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Nickname */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1 text-foreground">{t("input.nickname")}</label>
                        <Input
                            name="nickname"
                            required
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder={t("input.nickname.placeholder")}
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 rounded-xl transition-all"
                        />
                    </div>

                    {/* Age + Job */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 text-foreground">{t("input.age")}</label>
                            <Input
                                name="age"
                                required
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder={t("input.age.placeholder")}
                                className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 rounded-xl transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 text-foreground">{t("input.job")}</label>
                            <Input
                                name="job"
                                required
                                value={formData.job}
                                onChange={handleChange}
                                placeholder={t("input.job.placeholder")}
                                className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 rounded-xl transition-all"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-4 text-sm text-muted-foreground font-medium">
                                {t("input.whatIf.label")}
                            </span>
                        </div>
                    </div>

                    {/* What If */}
                    <div className="space-y-2">
                        <Textarea
                            name="whatIf"
                            required
                            rows={5}
                            value={formData.whatIf}
                            onChange={handleChange}
                            placeholder={t("input.whatIf.placeholder")}
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background text-base p-4 leading-relaxed resize-none rounded-2xl transition-all"
                        />
                    </div>
                </form>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] z-40">
                <div className="w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
                <div className="p-6 pb-8">
                    <Button
                        type="submit"
                        form="input-form"
                        size="lg"
                        className="w-full text-lg h-14 font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-none shadow-xl shadow-primary/20"
                    >
                        {t("input.submit")}
                    </Button>
                </div>
            </div>
        </main>
    );
}
