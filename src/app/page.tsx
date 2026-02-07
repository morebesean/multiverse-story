"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, User, Zap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 flex flex-col items-center justify-start relative overflow-hidden bg-background text-foreground transition-colors duration-300 pb-32">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] opacity-100 animate-pulse" />
      </div>

      <Header />

      <div className="relative z-10 w-full text-center space-y-12 px-6 pt-4 animate-fade-in-up">

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

      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 w-full max-w-[600px] p-6 bg-background/80 backdrop-blur-xl border-t border-border z-50">
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-xs text-muted-foreground font-medium animate-pulse">
            {t("landing.login")}
          </p>
          <Link href="/profile" className="w-full">
            <Button size="lg" className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20">
              {t("landing.cta")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

    </main>
  );
}
