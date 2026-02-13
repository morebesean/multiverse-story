"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Header } from "@/components/header";

export default function PrivacyPage() {
  const { t } = useLanguage();

  const sections = [
    { title: "privacy.collection.title", desc: "privacy.collection.desc" },
    { title: "privacy.cookies.title", desc: "privacy.cookies.desc" },
    { title: "privacy.thirdparty.title", desc: "privacy.thirdparty.desc" },
    { title: "privacy.security.title", desc: "privacy.security.desc" },
    { title: "privacy.children.title", desc: "privacy.children.desc" },
    { title: "privacy.changes.title", desc: "privacy.changes.desc" },
    { title: "privacy.contact.title", desc: "privacy.contact.desc" },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-start bg-background text-foreground transition-colors duration-300 pb-16">
      <Header />

      <div className="w-full max-w-[600px] px-6 pt-24 space-y-8">
        <Link
          href="/"
          className="text-sm text-primary hover:underline"
        >
          {t("privacy.back")}
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t("privacy.title")}
          </h1>
          <p className="text-xs text-muted-foreground">
            {t("privacy.lastUpdated")}
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("privacy.intro")}
        </p>

        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-lg font-semibold">{t(section.title)}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {t(section.desc)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
