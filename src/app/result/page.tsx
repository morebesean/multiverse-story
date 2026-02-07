"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ResultPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState("");
    const [data, setData] = useState<any>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        // Prevent double fetch in React Strict Mode
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
                alert("이야기를 생성하는 중 문제가 발생했습니다.");
                setIsLoading(false);
            }
        };

        fetchStory();
    }, [router]);

    if (isLoading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
                <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
                <p className="text-xl font-light text-gray-300 animate-pulse text-center">
                    <span className="block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                        멀티버스 접속 중...
                    </span>
                    당신의 다른 가능성을 탐색하고 있습니다.
                </p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white selection:bg-purple-500/30">
            <div className="max-w-3xl w-full space-y-8 animate-fade-in-up">

                {/* Header */}
                <div className="space-y-2 text-center">
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30 mb-2">
                        Multiverse Story No. #824
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        {data?.nickname}님의 새로운 이야기
                    </h1>
                </div>

                {/* Story Viewer */}
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl shadow-purple-900/20 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <div className="prose prose-invert prose-purple max-w-none leading-relaxed">
                        <ReactMarkdown>{story}</ReactMarkdown>
                    </div>
                    {story.length === 0 && !isLoading && (
                        <p className="text-gray-500">이야기를 불러오지 못했습니다.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => router.push("/input")}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-gray-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        다른 선택 해보기
                    </button>

                    <button
                        onClick={() => alert("공유 기능은 준비 중입니다!")}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/30"
                    >
                        <Share2 className="w-4 h-4" />
                        이야기 공유하기
                    </button>
                </div>

            </div>
        </main>
    );
}
