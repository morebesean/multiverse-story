"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ad-banner";
import { useLanguage } from "@/components/language-provider";
import { getScenarioById } from "@/lib/scenarios";
import type { Persona, ChatMessage, SummaryResult } from "@/lib/types";
import { Copy, RotateCcw, Check, Quote, Mail, ArrowRight } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("multiverse_result");
    if (!saved) {
      router.push("/create");
      return;
    }
    const data = JSON.parse(saved);
    setPersona(data.persona);
    setSummary(data.summary);
  }, [router]);

  const handleShare = async () => {
    if (!summary || !persona) return;
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
    const shareText = [
      `[${summary.universeId}] ${summary.title}`,
      "",
      `"${summary.bestMoment.quote}"`,
      "",
      summary.oneLiner,
      "",
      language === "ko"
        ? "다른 선택을 한 나와 대화해보세요."
        : "Talk to the you who made a different choice.",
      siteUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleRetry = () => {
    router.push("/branch");
  };

  const handleSuggestedScenario = (scenarioId: string) => {
    const profile = localStorage.getItem("multiverse_profile");
    if (!profile) {
      router.push("/create");
      return;
    }
    const scenario = getScenarioById(scenarioId);
    if (scenario) {
      const branch = {
        category: scenario.category,
        scenarioId: scenario.id,
        mood: "warm",
      };
      localStorage.setItem("multiverse_branch", JSON.stringify(branch));
      router.push("/chat");
    } else {
      router.push("/branch");
    }
  };

  if (!summary || !persona) return null;

  return (
    <>
      <Header />
      <main className="flex-1 px-6 pt-24 pb-32 space-y-6">
        {/* Universe Header */}
        <div className="text-center animate-fade-in-up">
          <p className="text-xs font-mono text-primary mb-2">
            {summary.universeId}
          </p>
          <h1 className="text-2xl font-bold mb-3">{summary.title}</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {summary.oneLiner}
          </p>
        </div>

        {/* Comparison Card */}
        <div className="rounded-2xl border border-border/50 overflow-hidden animate-fade-in-up [animation-delay:100ms]">
          <div className="grid grid-cols-2 divide-x divide-border/50">
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                {language === "ko" ? "현실의 나" : "Reality"}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "직업" : "Job"}:
                  </span>{" "}
                  {summary.comparison.reality.job}
                </p>
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "거주지" : "Location"}:
                  </span>{" "}
                  {summary.comparison.reality.location}
                </p>
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "라이프스타일" : "Lifestyle"}:
                  </span>{" "}
                  {summary.comparison.reality.lifestyle}
                </p>
              </div>
            </div>
            <div className="p-4 bg-primary/5">
              <p className="text-[10px] uppercase tracking-widest text-primary mb-3">
                {language === "ko" ? "멀티버스의 나" : "Multiverse"}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "직업" : "Job"}:
                  </span>{" "}
                  {summary.comparison.multiverse.job}
                </p>
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "거주지" : "Location"}:
                  </span>{" "}
                  {summary.comparison.multiverse.location}
                </p>
                <p>
                  <span className="text-muted-foreground">
                    {language === "ko" ? "라이프스타일" : "Lifestyle"}:
                  </span>{" "}
                  {summary.comparison.multiverse.lifestyle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Moment */}
        <div className="rounded-2xl bg-secondary/30 border border-border/50 p-6 text-center animate-fade-in-up [animation-delay:200ms]">
          <Quote className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="text-lg font-medium leading-relaxed italic mb-3">
            &ldquo;{summary.bestMoment.quote}&rdquo;
          </p>
          <p className="text-xs text-muted-foreground">
            —{" "}
            {summary.bestMoment.speaker === "multiverse"
              ? language === "ko"
                ? "평행우주의 나"
                : "Multiverse Self"
              : language === "ko"
                ? "나"
                : "You"}
          </p>
        </div>

        {/* Letter */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 animate-fade-in-up [animation-delay:300ms]">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">
              {language === "ko"
                ? "평행우주에서 온 편지"
                : "A Letter from the Multiverse"}
            </h3>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {summary.letter}
          </p>
        </div>

        {/* Ad */}
        <AdBanner
          slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING || ""}
          format="rectangle"
          className="animate-fade-in-up [animation-delay:400ms]"
        />

        {/* Actions */}
        <div className="flex gap-3 animate-fade-in-up [animation-delay:500ms]">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handleRetry}
          >
            <RotateCcw className="w-4 h-4" />
            {language === "ko" ? "다른 선택" : "Try Another"}
          </Button>
          <Button className="flex-1 gap-2" onClick={handleShare}>
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {language === "ko" ? "복사됨!" : "Copied!"}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {language === "ko" ? "공유하기" : "Share"}
              </>
            )}
          </Button>
        </div>

        {/* Suggested Scenarios */}
        {summary.suggestedScenarios && summary.suggestedScenarios.length > 0 && (
          <div className="animate-fade-in-up [animation-delay:600ms]">
            <h3 className="text-sm font-semibold mb-3">
              {language === "ko"
                ? "다른 선택도 해보세요"
                : "Try another path"}
            </h3>
            <div className="space-y-2">
              {summary.suggestedScenarios.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedScenario(s.scenarioId)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors text-left"
                >
                  <span className="text-sm">{s.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
