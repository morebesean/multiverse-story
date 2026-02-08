"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ScenarioPage() {
    const router = useRouter();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        whatIf: "",
        desire: "",
        constraint: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedData = localStorage.getItem("multiverse_base_info");
        if (!savedData) {
            router.push("/profile");
            return;
        }
        setIsLoading(false);
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save the scenario info
        localStorage.setItem("multiverse_scenario_info", JSON.stringify(formData));
        router.push("/result");
    };

    if (isLoading) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full max-w-lg px-6 pt-24 space-y-8 animate-fade-in-up">

                {/* Title Section */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Final Step
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 pb-1 whitespace-pre-line">
                            {t("input.alternateChoice")}
                        </h2>
                        <p className="text-muted-foreground whitespace-pre-line mt-2 leading-relaxed">
                            {t("landing.feature.choice.desc")}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <form id="scenario-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1 text-foreground flex items-center gap-2">
                            만약 그때...
                            <span className="text-xs font-normal text-muted-foreground">(필수)</span>
                        </label>
                        <Textarea
                            name="whatIf"
                            required
                            rows={6}
                            value={formData.whatIf}
                            onChange={handleChange}
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background text-lg p-6 leading-relaxed resize-none rounded-2xl transition-all"
                            placeholder="변경하고 싶은 과거의 선택을 입력해주세요."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1 text-foreground">{t("input.desire")}</label>
                        <Input
                            name="desire"
                            value={formData.desire}
                            onChange={handleChange}
                            placeholder="바라는 삶의 모습을 입력해주세요."
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 px-4 rounded-xl transition-all text-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold ml-1 text-foreground">{t("input.constraint")}</label>
                        <Input
                            name="constraint"
                            value={formData.constraint}
                            onChange={handleChange}
                            placeholder="유지하고 싶은 조건을 입력해주세요."
                            className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 px-4 rounded-xl transition-all text-lg"
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
                        form="scenario-form"
                        size="lg"
                        className="w-full text-lg h-14 font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-none shadow-xl shadow-pink-500/20"
                    >
                        {t("input.submit")}
                    </Button>
                </div>
            </div>
        </main>
    );
}
