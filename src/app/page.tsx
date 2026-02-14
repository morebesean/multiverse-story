"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  GitBranch,
  CheckCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <GitBranch className="w-6 h-6 text-primary" />,
      title: language === "ko" ? "분기점 선택" : "Choose a Path",
      desc:
        language === "ko"
          ? "인생의 갈림길에서\n다른 선택을 골라보세요."
          : "Pick a different choice\nat life's crossroads.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: language === "ko" ? "페르소나 생성" : "Meet Your Other Self",
      desc:
        language === "ko"
          ? "AI가 그 길을 걸어간\n또 다른 당신을 만들어냅니다."
          : "AI creates the version of you\nwho took that path.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      title: language === "ko" ? "대화하기" : "Have a Conversation",
      desc:
        language === "ko"
          ? "평행우주의 나와\n직접 대화를 나눠보세요."
          : "Chat directly with\nyour alternate self.",
    },
  ];

  const faqItems = [
    {
      q: language === "ko" ? "무료인가요?" : "Is it free to use?",
      a:
        language === "ko"
          ? "네, 완전 무료입니다. 로그인도 필요 없습니다."
          : "Yes, completely free. No login required.",
    },
    {
      q: language === "ko" ? "내 데이터가 저장되나요?" : "Is my data stored?",
      a:
        language === "ko"
          ? "모든 데이터는 브라우저에만 저장됩니다. 서버에 전송되거나 저장되지 않습니다."
          : "All data stays in your browser. Nothing is sent to or stored on our servers.",
    },
    {
      q:
        language === "ko"
          ? "평행우주의 나와 정말 대화할 수 있나요?"
          : "Can I really talk to my alternate self?",
      a:
        language === "ko"
          ? "AI가 당신의 정보와 선택을 기반으로 페르소나를 생성하고, 그 캐릭터로서 대화합니다. 매번 다른 결과가 나옵니다."
          : "AI creates a persona based on your info and choices, then chats as that character. Every conversation is unique.",
    },
    {
      q:
        language === "ko"
          ? "여러 시나리오를 해볼 수 있나요?"
          : "Can I try multiple scenarios?",
      a:
        language === "ko"
          ? "물론입니다! 다른 분기점을 선택하면 전혀 다른 평행우주의 나를 만날 수 있습니다."
          : "Absolutely! Choose different paths to meet entirely different versions of yourself.",
    },
  ];

  const recommendItems =
    language === "ko"
      ? [
          "'그때 다른 선택을 했다면?' 생각해본 적 있는 분",
          "인생의 갈림길에서 고민 중인 분",
          "AI와 색다른 대화를 해보고 싶은 분",
          "재미있는 결과를 친구에게 공유하고 싶은 분",
        ]
      : [
          "Anyone who's wondered 'What if I chose differently?'",
          "Those standing at a crossroad in life",
          "People who want a unique AI conversation experience",
          "Anyone who loves sharing fun results with friends",
        ];

  return (
    <main className="flex-1 flex flex-col items-center justify-start relative overflow-hidden bg-background text-foreground transition-colors duration-300 pb-32">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] opacity-100 animate-pulse" />
      </div>

      <Header />

      <div className="relative z-10 w-full text-center space-y-12 px-6 pt-24 animate-fade-in-up">
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {language === "ko" ? "멀티버스" : "Multiverse"}
          </h1>
          <p className="text-lg text-muted-foreground font-normal leading-relaxed whitespace-pre-line">
            {language === "ko"
              ? "다른 선택을 한 나를 만나고\n직접 대화해보세요."
              : "Meet the you who made\na different choice.\nAnd talk to them."}
          </p>
        </div>

        {/* Features / How it works */}
        <div className="space-y-4 w-full">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/50 border border-border/50 text-left"
            >
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug whitespace-pre-line">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Section */}
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold tracking-tight">
            {language === "ko" ? "이런 분들에게 추천합니다" : "Who is this for?"}
          </h2>
          <div className="space-y-3 w-full">
            {recommendItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 text-left"
              >
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold tracking-tight">
            {language === "ko" ? "자주 묻는 질문" : "FAQ"}
          </h2>
          <div className="space-y-3 w-full">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-secondary/50 border border-border/50 text-left overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-foreground text-left">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pl-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full pt-8 pb-4 border-t border-border/50">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("landing.footer.privacy")}
            </Link>
            <p className="text-xs text-muted-foreground">
              {t("landing.footer.copyright")}
            </p>
          </div>
        </footer>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 w-full max-w-[600px] z-50">
        <div className="w-full h-24 bg-gradient-to-t from-background via-background/90 to-transparent absolute bottom-0 left-0 -z-10" />
        <div className="p-6 pb-8">
          <div className="flex flex-col items-center gap-3 w-full">
            <p className="text-xs text-muted-foreground font-medium animate-pulse">
              {language === "ko"
                ? "로그인 없이 바로 시작"
                : "Start without login"}
            </p>
            <Link href="/create" className="w-full">
              <Button
                size="lg"
                className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 gap-2"
              >
                {language === "ko"
                  ? "멀티버스 열기"
                  : "Open the Multiverse"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
