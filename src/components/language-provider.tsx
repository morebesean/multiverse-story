"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ko";

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        "landing.title": "Multiverse Story",
        "landing.subtitle": "What if you made a different choice?\nExplore your alternate realities.",
        "landing.cta": "Check Multiverse",
        "landing.login": "Start without login",
        "landing.feature.profile": "Profile",
        "landing.feature.profile.desc": "Tell us who you are and what your life looks like now.",
        "landing.feature.choice": "Choice",
        "landing.feature.choice.desc": "What was the turning point? What if you chose differently?",
        "landing.feature.story": "Story",
        "landing.feature.story.desc": "AI generates your alternate reality story in real-time.",
        "input.badge": "Quick Start",
        "input.title": "Create Multiverse",
        "input.subtitle": "Just a few details, and AI will craft your alternate reality.",
        "input.nickname": "Name (or Nickname)",
        "input.nickname.placeholder": "Enter your name",
        "input.age": "Birth Year",
        "input.age.placeholder": "e.g. 1995",
        "input.job": "Current Job",
        "input.job.placeholder": "e.g. Designer",
        "input.whatIf.label": "What if...",
        "input.whatIf.placeholder": "Describe the past choice you'd like to change.\ne.g. \"What if I studied music instead of engineering?\"",
        "input.submit": "See the Story",
        "result.loading": "Finding your alternate reality...",
        "result.loading.msg1": "Opening the dimensional gate...",
        "result.loading.msg2": "Scanning the multiverse...",
        "result.loading.msg3": "Finding your alternate self...",
        "result.loading.msg4": "Recording the observation report...",
        "result.error": "Something went wrong. Please try again.",
        "result.title": "'s New Story",
        "result.choice": "Choice:",
        "result.retry": "Try again",
        "result.share": "Share",
        "result.profile.title": "Subject Profile",
        "result.profile.age": "Age",
        "result.profile.job": "Job",
        "result.profile.residence": "Residence",
        "result.profile.worry": "Worry",
        "result.routine.title": "Daily Routine",
        "result.routine.morning": "Morning",
        "result.routine.afternoon": "Afternoon",
        "result.routine.night": "Night",
        "result.stats.title": "Life Stats",
        "result.stats.wealth": "Wealth",
        "result.stats.fame": "Fame",
        "result.stats.love": "Love",
        "result.stats.health": "Health",
        "result.stats.joy": "Joy",
        "result.timeline.title": "Timeline",
        "result.moments.title": "Cinematic Moments",
        "result.story.title": "Multiverse Story",
        "result.analysis.gained": "What You Gained",
        "result.analysis.lost": "What You Lost",
        "result.message.title": "Message from Universe",
    },
    ko: {
        "landing.title": "멀티버스 스토리",
        "landing.subtitle": "그때 만약 다른 선택을 했다면?\n당신의 또 다른 인생 이야기를\nAI가 들려드립니다.",
        "landing.cta": "멀티버스 확인하기",
        "landing.login": "로그인 없이 바로 시작할 수 있습니다",
        "landing.feature.profile": "프로필 입력",
        "landing.feature.profile.desc": "현재의 나는 어떤 모습인가요?\n당신의 이야기를 들려주세요.",
        "landing.feature.choice": "다른 선택",
        "landing.feature.choice.desc": "인생의 갈림길에서\n다른 길을 선택했다면 어땠을까요?",
        "landing.feature.story": "이야기 생성",
        "landing.feature.story.desc": "AI가 실시간으로 새로운 차원의\n당신의 삶을 그려냅니다.",
        "input.badge": "간편 입력",
        "input.title": "멀티버스 생성하기",
        "input.subtitle": "간단한 정보만 입력하면, AI가 당신의 또 다른 인생을 그려드립니다.",
        "input.nickname": "이름 (또는 닉네임)",
        "input.nickname.placeholder": "이름을 입력해주세요",
        "input.age": "출생년도",
        "input.age.placeholder": "예) 1995",
        "input.job": "현재 직업",
        "input.job.placeholder": "예) 디자이너",
        "input.whatIf.label": "만약 그때...",
        "input.whatIf.placeholder": "변경하고 싶은 과거의 선택을 입력해주세요.\n예) \"대학 때 컴퓨터공학 대신 음악을 전공했다면\"",
        "input.submit": "이야기 확인하러 가기",
        "result.loading": "다른 차원의 당신을 찾고 있습니다...",
        "result.loading.msg1": "차원의 문을 열고 있습니다...",
        "result.loading.msg2": "멀티버스를 탐색하고 있습니다...",
        "result.loading.msg3": "또 다른 당신을 찾고 있습니다...",
        "result.loading.msg4": "관측 보고서를 작성하고 있습니다...",
        "result.error": "스토리 생성 중 문제가 발생했습니다. 다시 시도해주세요.",
        "result.title": "님의 멀티버스 리포트",
        "result.choice": "선택:",
        "result.retry": "다시 입력",
        "result.share": "공유하기",
        "result.profile.title": "프로필",
        "result.profile.age": "나이",
        "result.profile.job": "직업",
        "result.profile.residence": "거주지",
        "result.profile.worry": "고민",
        "result.routine.title": "데일리 루틴",
        "result.routine.morning": "오전",
        "result.routine.afternoon": "오후",
        "result.routine.night": "밤",
        "result.stats.title": "생애 지수",
        "result.stats.wealth": "자산",
        "result.stats.fame": "명예",
        "result.stats.love": "사랑",
        "result.stats.health": "건강",
        "result.stats.joy": "행복",
        "result.timeline.title": "타임라인",
        "result.moments.title": "시네마틱 모먼트",
        "result.story.title": "멀티버스 이야기",
        "result.analysis.gained": "얻은 것",
        "result.analysis.lost": "잃은 것",
        "result.message.title": "우주로부터의 메시지",
    },
};

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Load language preference, or detect from browser
    useEffect(() => {
        const savedLang = localStorage.getItem("multiverse_lang") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        } else {
            const browserLang = navigator.language || "";
            const detected: Language = browserLang.startsWith("ko") ? "ko" : "en";
            setLanguage(detected);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("multiverse_lang", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
