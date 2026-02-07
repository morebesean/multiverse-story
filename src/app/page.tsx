"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, User, Zap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-background text-foreground transition-colors duration-300">

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[100px] opacity-50 animate-pulse delay-1000" />
      </div>

      <Header />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-16 px-6 pt-20">

        {/* Hero Section */}
        <div className="space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 pb-2">
            {t("landing.title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed whitespace-pre-line">
            {t("landing.subtitle")}
          </p>

          <div className="pt-4 flex flex-col items-center gap-4">
            <Link href="/input">
              <Button size="lg" className="group text-lg px-8 py-6 rounded-full">
                {t("landing.cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("landing.login")}
            </p>
          </div>
        </div>

        {/* Features / How it works */}
        <div className="grid md:grid-cols-3 gap-8 py-12 border-t border-border/50">
          <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/50 transition-colors">
            <div className="p-3 bg-purple-500/10 rounded-full">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold text-lg">{t("landing.feature.profile")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("landing.feature.profile.desc")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-pink-500/50 transition-colors">
            <div className="p-3 bg-pink-500/10 rounded-full">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-semibold text-lg">{t("landing.feature.choice")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("landing.feature.choice.desc")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-blue-500/50 transition-colors">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg">{t("landing.feature.story")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("landing.feature.story.desc")}
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-muted-foreground">
        © 2024 Multiverse Story. Powered by OpenAI.
      </footer>
    </main>
  );
}
