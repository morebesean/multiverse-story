"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-provider";
import type { AgeGroup, Gender, UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

const ageGroups: { value: AgeGroup; label: { en: string; ko: string } }[] = [
  { value: "10s", label: { en: "10s", ko: "10대" } },
  { value: "20s", label: { en: "20s", ko: "20대" } },
  { value: "30s", label: { en: "30s", ko: "30대" } },
  { value: "40s", label: { en: "40s", ko: "40대" } },
  { value: "50s+", label: { en: "50s+", ko: "50대+" } },
];

const genders: { value: Gender; label: { en: string; ko: string } }[] = [
  { value: "male", label: { en: "Male", ko: "남성" } },
  { value: "female", label: { en: "Female", ko: "여성" } },
  { value: "other", label: { en: "Other", ko: "기타" } },
  { value: "skip", label: { en: "Skip", ko: "패스" } },
];

export default function CreatePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [nickname, setNickname] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);

  const isValid = nickname.trim().length > 0 && ageGroup && gender;

  const handleNext = () => {
    if (!isValid) return;
    const profile: UserProfile = {
      nickname: nickname.trim(),
      ageGroup: ageGroup!,
      gender: gender!,
    };
    localStorage.setItem("multiverse_profile", JSON.stringify(profile));
    router.push("/branch");
  };

  return (
    <>
      <Header />
      <main className="flex-1 px-6 pt-24 pb-32">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3">
            Step 1 / 2
          </span>
          <h1 className="text-2xl font-bold mb-2">
            {language === "ko" ? "당신에 대해 알려주세요" : "Tell us about yourself"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === "ko"
              ? "평행우주의 나를 찾기 위한 간단한 정보입니다."
              : "Just a few details to find your alternate self."}
          </p>
        </div>

        {/* Nickname */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t("input.nickname")}
          </label>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t("input.nickname.placeholder")}
            maxLength={20}
          />
        </div>

        {/* Age Group */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {language === "ko" ? "나이대" : "Age Group"}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ageGroups.map((ag) => (
              <button
                key={ag.value}
                onClick={() => setAgeGroup(ag.value)}
                className={cn(
                  "h-11 rounded-xl text-sm font-medium transition-all border",
                  ageGroup === ag.value
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-secondary/50 text-foreground border-transparent hover:bg-secondary"
                )}
              >
                {ag.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            {t("input.gender")}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {genders.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={cn(
                  "h-11 rounded-xl text-sm font-medium transition-all border",
                  gender === g.value
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-secondary/50 text-foreground border-transparent hover:bg-secondary"
                )}
              >
                {g.label[language]}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] p-6 bg-background/80 backdrop-blur-md border-t border-border/50">
        <Button
          className="w-full"
          size="lg"
          disabled={!isValid}
          onClick={handleNext}
        >
          {language === "ko" ? "다음: 분기점 선택" : "Next: Choose Your Path"}
        </Button>
      </div>
    </>
  );
}
