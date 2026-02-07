"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Save } from "lucide-react";

export default function InputPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nickname: "",
        currentSituation: "",
        alternateChoice: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    // Load data from LocalStorage on mount
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
        // Save to LocalStorage
        localStorage.setItem("multiverse_user_data", JSON.stringify(formData));

        // Navigate to result page
        router.push("/result");
    };

    if (isLoading) return null; // Prevent hydration mismatch

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative z-10 max-w-xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 ring-1 ring-white/10">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        멀티버스 생성하기
                    </h2>
                    <p className="text-gray-400">
                        당신의 이야기를 들려주세요. 다른 우주의 당신을 찾아드립니다.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">

                    {/* Nickname Input */}
                    <div className="space-y-2">
                        <label htmlFor="nickname" className="text-sm font-medium text-gray-300 ml-1">
                            이름 (또는 닉네임)
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            required
                            placeholder="예: 김코딩"
                            value={formData.nickname}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-gray-600"
                        />
                    </div>

                    {/* Current Situation Input */}
                    <div className="space-y-2">
                        <label htmlFor="currentSituation" className="text-sm font-medium text-gray-300 ml-1">
                            현재 당신의 모습은?
                        </label>
                        <textarea
                            id="currentSituation"
                            name="currentSituation"
                            required
                            rows={3}
                            placeholder="예: 매일 야근에 시달리는 3년차 개발자"
                            value={formData.currentSituation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-gray-600 resize-none"
                        />
                    </div>

                    {/* Alternate Choice Input */}
                    <div className="space-y-2">
                        <label htmlFor="alternateChoice" className="text-sm font-medium text-purple-300 ml-1">
                            그때 만약... 어떤 선택을 했다면?
                        </label>
                        <textarea
                            id="alternateChoice"
                            name="alternateChoice"
                            required
                            rows={3}
                            placeholder="예: 취업 대신 세계여행을 떠났다면?"
                            value={formData.alternateChoice}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-purple-900/10 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-gray-600 resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="group w-full flex items-center justify-center gap-2 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        이야기 확인하러 가기
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center text-xs text-gray-600">
                    <Save className="w-3 h-3 inline mr-1" />
                    입력하신 내용은 브라우저에 자동 저장됩니다
                </p>
            </div>
        </main>
    );
}
