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
        "input.gender": "Gender",
        "input.gender.male": "Male",
        "input.gender.female": "Female",
        "input.gender.other": "Other",
        "input.mood": "Story Mood",
        "input.mood.hopeful": "Hopeful",
        "input.mood.realistic": "Realistic",
        "input.mood.cynical": "Cynical",
        "input.mood.dramatic": "Dramatic",
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
        "result.share.copied": "'s multiverse story has been copied. Share it with your friends!",
        "result.share.service": "What if I made a different choice? AI tells your alternate reality story.",
        "result.share.close": "Close",

        "landing.recommend.title": "Who is this for?",
        "landing.recommend.1": "Anyone curious about 'What if I chose differently?'",
        "landing.recommend.2": "Those standing at a crossroad, unsure which path to take",
        "landing.recommend.3": "People who enjoy creative storytelling and alternate realities",
        "landing.recommend.4": "Anyone looking for a fun, reflective experience powered by AI",
        "landing.faq.title": "Frequently Asked Questions",
        "landing.faq.q1": "Is it free to use?",
        "landing.faq.a1": "Yes, Multiverse Story is completely free. No login or sign-up required.",
        "landing.faq.q2": "Is my data stored on a server?",
        "landing.faq.a2": "No. All data is stored only in your browser's local storage and is never sent to or saved on any server.",
        "landing.faq.q3": "How does the AI generate stories?",
        "landing.faq.a3": "Based on your profile and the choice you provide, our AI creates a unique alternate-reality story in real-time.",
        "landing.faq.q4": "Can I try multiple scenarios?",
        "landing.faq.a4": "Absolutely! You can explore as many alternate realities as you'd like.",
        "landing.footer.privacy": "Privacy Policy",
        "landing.footer.copyright": "© 2025 Multiverse Story. All rights reserved.",

        "privacy.title": "Privacy Policy",
        "privacy.intro": "Multiverse Story (\"we\", \"our\", \"the Service\") values your privacy. This policy explains how we handle your information.",
        "privacy.collection.title": "Information We Collect",
        "privacy.collection.desc": "We do not collect personal information on any server. All user-entered data (name, birth year, job, scenario) is stored only in your browser's local storage and is never transmitted to or stored on our servers.",
        "privacy.cookies.title": "Cookies & Advertising",
        "privacy.cookies.desc": "We use Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your browsing history. You can opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).",
        "privacy.thirdparty.title": "Third-Party Services",
        "privacy.thirdparty.desc": "Our Service uses the following third-party services that may collect information:\n• Google AdSense – for displaying advertisements\n• AI API – for generating stories (only the inputs you provide for a single session are sent; no personal data is stored)",
        "privacy.security.title": "Data Security",
        "privacy.security.desc": "Since we do not store your personal data on any server, the risk of data breach from our side is minimized. However, please be aware that local storage in your browser can be cleared by you at any time.",
        "privacy.children.title": "Children's Privacy",
        "privacy.children.desc": "Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children.",
        "privacy.changes.title": "Changes to This Policy",
        "privacy.changes.desc": "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
        "privacy.contact.title": "Contact Us",
        "privacy.contact.desc": "If you have any questions about this Privacy Policy, please contact us at: more.be.sean@gmail.com",
        "privacy.lastUpdated": "Last updated: 2025-01-01",
        "privacy.back": "← Back to Home",
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
        "input.gender": "성별",
        "input.gender.male": "남성",
        "input.gender.female": "여성",
        "input.gender.other": "기타",
        "input.mood": "스토리 분위기",
        "input.mood.hopeful": "희망적",
        "input.mood.realistic": "현실적",
        "input.mood.cynical": "시니컬",
        "input.mood.dramatic": "드라마틱",
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
        "result.share.copied": "님의 멀티버스 이야기를 복사했습니다. 친구들에게 공유해보세요!",
        "result.share.service": "그때 다른 선택을 했다면?\nAI가 들려주는 나의 또 다른 인생 이야기.",
        "result.share.close": "닫기",

        "landing.recommend.title": "이런 분들에게 추천합니다",
        "landing.recommend.1": "'그때 다른 선택을 했다면?'이라는 생각을 해본 적 있는 분",
        "landing.recommend.2": "인생의 갈림길에서 어떤 길을 선택해야 할지 고민 중인 분",
        "landing.recommend.3": "창작 스토리와 대체 현실을 즐기는 분",
        "landing.recommend.4": "AI 기반의 재미있고 의미 있는 경험을 원하는 분",
        "landing.faq.title": "자주 묻는 질문",
        "landing.faq.q1": "무료인가요?",
        "landing.faq.a1": "네, 멀티버스 스토리는 완전 무료입니다. 로그인이나 회원가입이 필요 없습니다.",
        "landing.faq.q2": "제 데이터가 서버에 저장되나요?",
        "landing.faq.a2": "아니요. 모든 데이터는 브라우저의 로컬 스토리지에만 저장되며, 서버에 전송되거나 저장되지 않습니다.",
        "landing.faq.q3": "AI는 어떻게 스토리를 생성하나요?",
        "landing.faq.a3": "입력하신 프로필과 선택을 바탕으로 AI가 실시간으로 독특한 대체 현실 스토리를 만들어냅니다.",
        "landing.faq.q4": "여러 시나리오를 시도할 수 있나요?",
        "landing.faq.a4": "물론입니다! 원하는 만큼 다양한 대체 현실을 탐험할 수 있습니다.",
        "landing.footer.privacy": "개인정보처리방침",
        "landing.footer.copyright": "© 2025 Multiverse Story. All rights reserved.",

        "privacy.title": "개인정보처리방침",
        "privacy.intro": "멀티버스 스토리(이하 \"서비스\")는 이용자의 개인정보를 소중히 여깁니다. 본 방침은 서비스가 정보를 어떻게 처리하는지 설명합니다.",
        "privacy.collection.title": "수집하는 정보",
        "privacy.collection.desc": "서비스는 서버에 어떠한 개인정보도 수집하지 않습니다. 이용자가 입력하는 모든 데이터(이름, 출생년도, 직업, 시나리오)는 브라우저의 로컬 스토리지에만 저장되며, 서버로 전송되거나 서버에 저장되지 않습니다.",
        "privacy.cookies.title": "쿠키 및 광고",
        "privacy.cookies.desc": "서비스는 광고 표시를 위해 Google AdSense를 사용합니다. Google AdSense는 쿠키와 웹 비콘을 사용하여 이전 방문 기록을 기반으로 광고를 제공할 수 있습니다. Google의 광고 쿠키 사용에 대한 자세한 내용은 Google 광고 설정(https://adssettings.google.com)에서 확인하고 맞춤 광고를 해제할 수 있습니다.",
        "privacy.thirdparty.title": "제3자 서비스",
        "privacy.thirdparty.desc": "서비스는 다음과 같은 제3자 서비스를 사용하며, 이들이 정보를 수집할 수 있습니다:\n• Google AdSense – 광고 표시\n• AI API – 스토리 생성 (단일 세션에서 입력한 내용만 전송되며, 개인정보는 저장되지 않음)",
        "privacy.security.title": "데이터 보안",
        "privacy.security.desc": "서비스는 서버에 개인정보를 저장하지 않으므로, 서버 측 데이터 유출 위험이 최소화됩니다. 브라우저의 로컬 스토리지는 언제든지 직접 삭제할 수 있습니다.",
        "privacy.children.title": "아동 개인정보",
        "privacy.children.desc": "서비스는 만 14세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다.",
        "privacy.changes.title": "방침 변경",
        "privacy.changes.desc": "본 개인정보처리방침은 수시로 업데이트될 수 있습니다. 변경 사항은 이 페이지에 게시되며, 시행일이 업데이트됩니다.",
        "privacy.contact.title": "문의",
        "privacy.contact.desc": "개인정보처리방침에 대한 문의사항이 있으시면 다음으로 연락해주세요: more.be.sean@gmail.com",
        "privacy.lastUpdated": "최종 업데이트: 2025-01-01",
        "privacy.back": "← 홈으로 돌아가기",
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
