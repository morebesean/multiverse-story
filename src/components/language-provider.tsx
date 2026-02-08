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
        "input.title": "Create Multiverse",
        "input.subtitle": "Tell us your story. We'll find another you.",
        "input.nickname": "Name (or Nickname)",
        "input.currentSituation": "Who are you now?",
        "input.alternateChoice": "What if... you made a different choice?",
        "input.submit": "See the Story",
        "input.save": "Auto-saved to browser",
        "input.next": "Next Step",
        "input.step1": "Basic Profile",
        "input.step2": "Current State",
        "input.step3": "Disposition",
        "input.gender.male": "Male",
        "input.gender.female": "Female",
        "input.gender.other": "Other",
        "input.decision.stability": "Stability",
        "input.decision.challenge": "Challenge",
        "input.decision.situational": "Situational",
        "input.value.money": "Money",
        "input.value.fame": "Fame",
        "input.value.love": "Love",
        "input.value.freedom": "Freedom",
        "input.value.power": "Power",
        "input.value.peace": "Peace",
        "result.loading": "Finding your alternate reality...",
        "result.title": "'s New Story",
        "result.choice": "Choice:",
        "result.retry": "Try again",
        "result.share": "Share",
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
        "input.title": "멀티버스 생성하기",
        "input.subtitle": "당신의 이야기를 들려주세요. 다른 우주의 당신을 찾아드립니다.",
        "input.nickname": "이름 (또는 닉네임)",
        "input.age": "나이 (출생년도)",
        "input.gender": "성별",
        "input.job": "현재 직업",
        "input.residence": "거주지 (도시/국가)",
        "input.worry": "가장 큰 고민",
        "input.emotion": "요즘 주된 감정",
        "input.satisfaction": "현재 삶의 만족도 (1-10)",
        "input.decisionStyle": "의사결정 스타일",
        "input.personality": "성격 키워드",
        "input.values": "중요하게 생각하는 가치",
        "input.currentSituation": "현재 당신의 모습은?",
        "input.alternateChoice": "그때 만약...\n어떤 선택을 했다면?",
        "input.desire": "은근히 바라는 삶 (선택)",
        "input.constraint": "절대 변하지 않았으면 하는 것 (선택)",
        "input.submit": "이야기 확인하러 가기",
        "input.save": "입력하신 내용은 브라우저에 자동 저장됩니다",
        "input.next": "다음 단계로",
        "input.step1": "기본 프로필",
        "input.step2": "현재 상태 체크",
        "input.step3": "성향 및 가치관",
        "input.gender.male": "남성",
        "input.gender.female": "여성",
        "input.gender.other": "기타",
        "input.decision.stability": "안정 추구형",
        "input.decision.challenge": "도전 추구형",
        "input.decision.situational": "상황에 따라 다름",
        "input.value.money": "돈 (Money)",
        "input.value.fame": "명예 (Fame)",
        "input.value.love": "사랑 (Love)",
        "input.value.freedom": "자유 (Freedom)",
        "input.value.power": "권력 (Power)",
        "input.value.peace": "평화 (Peace)",
        "result.loading": "다른 차원의 당신을 찾고 있습니다...",
        "result.title": "님의 멀티버스 리포트",
        "result.choice": "선택:",
        "result.retry": "다시 입력",
        "result.share": "공유하기",
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
