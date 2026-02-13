"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, User, Zap, CheckCircle, HelpCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { q: "landing.faq.q1", a: "landing.faq.a1" },
    { q: "landing.faq.q2", a: "landing.faq.a2" },
    { q: "landing.faq.q3", a: "landing.faq.a3" },
    { q: "landing.faq.q4", a: "landing.faq.a4" },
  ];

  const recommendItems = [
    "landing.recommend.1",
    "landing.recommend.2",
    "landing.recommend.3",
    "landing.recommend.4",
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
            {t("landing.title")}
          </h1>
          <p className="text-lg text-muted-foreground font-normal leading-relaxed whitespace-pre-line">
            {t("landing.subtitle")}
          </p>
        </div>

        {/* Features / How it works */}
        <div className="space-y-4 w-full">
          {/* Feature 1 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/50 border border-border/50 text-left">
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">{t("landing.feature.profile")}</h3>
              <p className="text-sm text-muted-foreground leading-snug whitespace-pre-line">
                {t("landing.feature.profile.desc")}
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/50 border border-border/50 text-left">
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm shrink-0">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">{t("landing.feature.choice")}</h3>
              <p className="text-sm text-muted-foreground leading-snug whitespace-pre-line">
                {t("landing.feature.choice.desc")}
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/50 border border-border/50 text-left">
            <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm shrink-0">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">{t("landing.feature.story")}</h3>
              <p className="text-sm text-muted-foreground leading-snug whitespace-pre-line">
                {t("landing.feature.story.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("landing.recommend.title")}
          </h2>
          <div className="space-y-3 w-full">
            {recommendItems.map((key, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/50 text-left"
              >
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 w-full">
          <h2 className="text-2xl font-bold tracking-tight">
            {t("landing.faq.title")}
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
                    <span className="text-sm font-semibold text-foreground text-left">{t(item.q)}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 pl-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(item.a)}</p>
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
              {t("landing.login")}
            </p>
            <Link href="/profile" className="w-full">
              <Button size="lg" className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                {t("landing.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
