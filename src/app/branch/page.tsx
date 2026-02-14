"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/language-provider";
import { categories, getScenariosByCategory } from "@/lib/scenarios";
import type { ScenarioCategory, Mood, BranchSelection, UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil } from "lucide-react";

const moods: { value: Mood; label: { en: string; ko: string }; emoji: string }[] = [
  { value: "warm", label: { en: "Warm", ko: "따뜻하게" }, emoji: "😊" },
  { value: "dramatic", label: { en: "Dramatic", ko: "드라마틱" }, emoji: "🎬" },
  { value: "realistic", label: { en: "Realistic", ko: "현실적" }, emoji: "🌙" },
  { value: "cynical", label: { en: "Cynical", ko: "냉소적" }, emoji: "😈" },
];

export default function BranchPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ScenarioCategory | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("multiverse_profile");
    if (!saved) {
      router.push("/create");
      return;
    }
    setProfile(JSON.parse(saved));
  }, [router]);

  const scenariosForCategory = selectedCategory
    ? getScenariosByCategory(selectedCategory)
    : [];

  const isValid =
    selectedCategory &&
    (selectedScenario || (showCustom && customText.trim().length > 0)) &&
    selectedMood;

  const handleGenerate = () => {
    if (!isValid) return;
    const branch: BranchSelection = {
      category: selectedCategory!,
      scenarioId: showCustom ? "custom" : selectedScenario!,
      customText: showCustom ? customText.trim() : undefined,
      mood: selectedMood!,
    };
    localStorage.setItem("multiverse_branch", JSON.stringify(branch));
    router.push("/chat");
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedScenario(null);
    setShowCustom(false);
  };

  if (!profile) return null;

  return (
    <>
      <Header />
      <main className="flex-1 px-6 pt-24 pb-32">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
            Step 2 / 2
          </span>
          <h1 className="text-2xl font-bold mb-2">
            {language === "ko" ? "어떤 분기점을 선택할까요?" : "Choose your divergence point"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === "ko"
              ? `${profile.nickname}님, 어떤 다른 선택을 해볼까요?`
              : `${profile.nickname}, what different choice will you make?`}
          </p>
        </div>

        {/* Category Selection */}
        {!selectedCategory && (
          <div className="space-y-3 animate-fade-in-up">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all text-left"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="font-medium">{cat.label[language]}</span>
              </button>
            ))}
          </div>
        )}

        {/* Scenario Selection */}
        {selectedCategory && !selectedMood && (
          <div className="animate-fade-in-up">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "ko" ? "카테고리 다시 선택" : "Back to categories"}
            </button>

            <div className="space-y-3 mb-6">
              {scenariosForCategory.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenario(sc.id);
                    setShowCustom(false);
                  }}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all",
                    selectedScenario === sc.id
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border/50 bg-secondary/30 hover:bg-secondary/60"
                  )}
                >
                  <span className="font-medium">{sc.label[language]}</span>
                </button>
              ))}

              {/* Custom input option */}
              <button
                onClick={() => {
                  setShowCustom(true);
                  setSelectedScenario(null);
                }}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-2",
                  showCustom
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border/50 bg-secondary/30 hover:bg-secondary/60"
                )}
              >
                <Pencil className="w-4 h-4" />
                <span className="font-medium">
                  {language === "ko" ? "직접 입력하기" : "Write my own"}
                </span>
              </button>

              {showCustom && (
                <Textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={
                    language === "ko"
                      ? "예) 대학 때 밴드를 시작했다면?"
                      : 'e.g. "What if I had started a band in college?"'
                  }
                  className="mt-2"
                  rows={3}
                />
              )}
            </div>

            {/* Mood selection - show after scenario is selected */}
            {(selectedScenario || (showCustom && customText.trim())) && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-medium mb-3">
                  {language === "ko" ? "분위기를 골라주세요" : "Pick the mood"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className={cn(
                        "h-12 rounded-xl font-medium transition-all border flex items-center justify-center gap-2",
                        selectedMood === m.value
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-secondary/50 text-foreground border-transparent hover:bg-secondary"
                      )}
                    >
                      <span>{m.emoji}</span>
                      <span className="text-sm">{m.label[language]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Fixed bottom CTA */}
      {isValid && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] p-6 bg-background/80 backdrop-blur-md border-t border-border/50 animate-fade-in-up">
          <Button className="w-full" size="lg" onClick={handleGenerate}>
            {language === "ko" ? "평행우주 열기" : "Open the Multiverse"}
          </Button>
        </div>
      )}
    </>
  );
}
