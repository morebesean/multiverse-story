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
        "input.title": "Create Multiverse",
        "input.subtitle": "Tell us your story. We'll find another you.",
        "input.nickname": "Name (or Nickname)",
        "input.currentSituation": "Who are you now?",
        "input.alternateChoice": "What if... you made a different choice?",
        "input.submit": "See the Story",
        "input.save": "Auto-saved to browser",
        "result.loading": "Finding your alternate reality...",
        "result.title": "'s New Story",
        "result.choice": "Choice:",
        "result.retry": "Try another choice",
        "result.share": "Share Story",
    },
    ko: {
        "landing.title": "멀티버스 스토리",
        "landing.subtitle": "그때 만약 다른 선택을 했다면?\n당신의 또 다른 인생 이야기를 AI가 들려드립니다.",
        "landing.cta": "멀티버스 확인하기",
        "landing.login": "로그인 없이 바로 시작할 수 있습니다",
        "input.title": "멀티버스 생성하기",
        "input.subtitle": "당신의 이야기를 들려주세요. 다른 우주의 당신을 찾아드립니다.",
        "input.nickname": "이름 (또는 닉네임)",
        "input.currentSituation": "현재 당신의 모습은?",
        "input.alternateChoice": "그때 만약... 어떤 선택을 했다면?",
        "input.submit": "이야기 확인하러 가기",
        "input.save": "입력하신 내용은 브라우저에 자동 저장됩니다",
        "result.loading": "다른 차원의 당신을 찾고 있습니다...",
        "result.title": "님의 새로운 이야기",
        "result.choice": "선택:",
        "result.retry": "다시 선택하러 가기",
        "result.share": "이야기 공유하기",
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

    // Load language preference (if any)
    useEffect(() => {
        const savedLang = localStorage.getItem("multiverse_lang") as Language;
        if (savedLang) {
            setLanguage(savedLang);
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
