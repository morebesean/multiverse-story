"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, UserCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        nickname: "",
        age: "",
        gender: "male",
        job: "",
        residence: "",
        worry: "",
        emotion: "",
        satisfaction: "5",
        decisionStyle: "situational",
        personality: "",
        values: "freedom",
    });

    useEffect(() => {
        const savedData = localStorage.getItem("multiverse_base_info");
        if (savedData) {
            setFormData({ ...formData, ...JSON.parse(savedData) });
        }
        setIsLoading(false);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        if (step < 3) {
            setStep(step + 1);
        } else {
            localStorage.setItem("multiverse_base_info", JSON.stringify(formData));
            router.push("/scenario");
        }
    };

    if (isLoading) return null;

    return (
        <main className="flex-1 flex flex-col items-center justify-start relative bg-background text-foreground pb-40">
            <Header />

            <div className="w-full max-w-lg px-6 pt-24 space-y-8 animate-fade-in-up">

                {/* Progress Bar */}
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {/* Title Section */}
                <div className="space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                        <UserCircle className="w-3 h-3" />
                        Step {step} of 3
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 pb-1">
                        {step === 1 && t("input.title")}
                        {step === 2 && "현재 상태 체크"}
                        {step === 3 && "성향 및 가치관"}
                    </h2>
                </div>

                {/* Form Section */}
                <form id="profile-form" onSubmit={handleNext} className="space-y-6">

                    {/* STEP 1: Basic Identity */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <InputField label={t("input.nickname")} name="nickname" value={formData.nickname} onChange={handleChange} required placeholder="홍길동" />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label={t("input.age")} name="age" value={formData.age} onChange={handleChange} required type="number" placeholder="1990" />
                                <SelectField label={t("input.gender")} name="gender" value={formData.gender} onChange={handleChange} options={[
                                    { value: "male", label: "남성" },
                                    { value: "female", label: "여성" },
                                    { value: "other", label: "기타" }
                                ]} />
                            </div>
                            <InputField label={t("input.job")} name="job" value={formData.job} onChange={handleChange} required placeholder="스타트업 PM" />
                            <InputField label={t("input.residence")} name="residence" value={formData.residence} onChange={handleChange} required placeholder="서울, 대한민국" />
                        </div>
                    )}

                    {/* STEP 2: Current State */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <InputField label={t("input.worry")} name="worry" value={formData.worry} onChange={handleChange} required placeholder="커리어 정체기, 건강 문제 등" />
                            <InputField label={t("input.emotion")} name="emotion" value={formData.emotion} onChange={handleChange} required placeholder="불안, 권태, 설렘 등" />
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1 text-foreground">{t("input.satisfaction")} ({formData.satisfaction})</label>
                                <input
                                    type="range"
                                    name="satisfaction"
                                    min="1"
                                    max="10"
                                    value={formData.satisfaction}
                                    onChange={handleChange}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground px-1">
                                    <span>Bad (1)</span>
                                    <span>Perfect (10)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Disposition */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <SelectField label={t("input.decisionStyle")} name="decisionStyle" value={formData.decisionStyle} onChange={handleChange} options={[
                                { value: "stability", label: "안정 추구형" },
                                { value: "challenge", label: "도전 추구형" },
                                { value: "situational", label: "상황에 따라 다름" }
                            ]} />
                            <InputField label={t("input.personality")} name="personality" value={formData.personality} onChange={handleChange} required placeholder="현실적, 예민함, 낙관적 (키워드 2-3개)" />
                            <SelectField label={t("input.values")} name="values" value={formData.values} onChange={handleChange} options={[
                                { value: "money", label: "돈 (Money)" },
                                { value: "fame", label: "명예 (Fame)" },
                                { value: "love", label: "사랑 (Love)" },
                                { value: "freedom", label: "자유 (Freedom)" },
                                { value: "power", label: "권력 (Power)" },
                                { value: "peace", label: "평화 (Peace)" }
                            ]} />
                        </div>
                    )}
                </form>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="fixed bottom-0 w-full max-w-[600px] z-40">
                <div className="w-full h-32 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
                <div className="p-6 pb-8">
                    <Button
                        type="submit"
                        form="profile-form"
                        size="lg"
                        className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20 gap-2"
                    >
                        {step < 3 ? t("input.next") : "다음 단계로"}
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </main>
    );
}

function InputField({ label, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 text-foreground">{label}</label>
            <Input {...props} className="w-full bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 rounded-xl transition-all" />
        </div>
    );
}

function SelectField({ label, options, ...props }: any) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold ml-1 text-foreground">{label}</label>
            <div className="relative">
                <select {...props} className="w-full appearance-none bg-secondary/30 border-2 border-dashed border-primary/20 focus:border-primary/50 focus:bg-background h-12 px-3 rounded-xl transition-all text-foreground outline-none">
                    {options.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-muted-foreground">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                </div>
            </div>
        </div>
    );
}
