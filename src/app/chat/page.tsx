"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ad-banner";
import { useLanguage } from "@/components/language-provider";
import { getScenarioById } from "@/lib/scenarios";
import type {
  UserProfile,
  BranchSelection,
  Persona,
  ChatMessage,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Send, Loader2, MessageCircle } from "lucide-react";

const FREE_TURNS = 3;
const BONUS_TURNS = 3;
const MIN_LOADING_TIME = 7000;
const AD_WALL_TIME = 5000;

type Phase = "loading" | "chat" | "ad-wall" | "generating-summary";

const loadingMessages = {
  en: [
    "Opening the dimensional gate...",
    "Searching for your alternate self...",
    "Analyzing timeline divergence...",
    "Calibrating multiverse coordinates...",
    "Your other self is almost here...",
  ],
  ko: [
    "차원의 문을 여는 중...",
    "평행우주의 당신을 찾고 있어요...",
    "시간선 분기를 분석하는 중...",
    "멀티버스 좌표를 계산 중...",
    "또 다른 당신이 거의 도착했어요...",
  ],
};

export default function ChatPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("loading");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [branch, setBranch] = useState<BranchSelection | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [maxTurns, setMaxTurns] = useState(FREE_TURNS);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load profile & branch from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("multiverse_profile");
    const savedBranch = localStorage.getItem("multiverse_branch");
    if (!savedProfile || !savedBranch) {
      router.push("/create");
      return;
    }
    setProfile(JSON.parse(savedProfile));
    setBranch(JSON.parse(savedBranch));
  }, [router]);

  // Generate persona when data is ready
  useEffect(() => {
    if (!profile || !branch) return;

    const startTime = Date.now();

    // Loading message rotation
    const msgInterval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages[language].length);
    }, 2000);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const elapsed = Date.now() - startTime;
        const target = Math.min((elapsed / MIN_LOADING_TIME) * 90, 90);
        return prev + (target - prev) * 0.1;
      });
    }, 100);

    // Fetch persona
    const fetchPersona = async () => {
      try {
        const response = await fetch("/api/persona", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile,
            scenarioId: branch.scenarioId,
            customText: branch.customText,
            mood: branch.mood,
            language,
          }),
        });

        if (!response.ok) throw new Error("Failed to generate persona");
        const data = await response.json();

        // Ensure minimum loading time for ad impression
        const elapsed = Date.now() - startTime;
        const remaining = MIN_LOADING_TIME - elapsed;
        if (remaining > 0) {
          await new Promise((r) => setTimeout(r, remaining));
        }

        setPersona(data);
        setMessages([{ role: "assistant", content: data.greeting }]);
        setLoadingProgress(100);

        setTimeout(() => setPhase("chat"), 300);
      } catch (err) {
        console.error(err);
        setError(
          language === "ko"
            ? "페르소나 생성에 실패했습니다. 다시 시도해주세요."
            : "Failed to create your alternate self. Please try again."
        );
      }
    };

    fetchPersona();

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [profile, branch, language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming || !persona || !profile) return;
    if (turnCount >= maxTurns) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const newTurn = turnCount + 1;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTurnCount(newTurn);
    setIsStreaming(true);

    try {
      const allMessages = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          profile,
          messages: allMessages,
          turnNumber: newTurn,
          maxTurns,
          language,
        }),
      });

      if (!response.ok) throw new Error("Chat failed");

      // Read streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // Add empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "ko"
              ? "잠깐, 연결이 불안정한 것 같아... 다시 말해줄래?"
              : "Hold on, the connection seems unstable... Could you say that again?",
        },
      ]);
      setTurnCount((prev) => prev - 1);
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }, [input, isStreaming, persona, profile, messages, turnCount, maxTurns, language]);

  // Handle ad wall - watch ad for more turns
  const handleWatchAd = () => {
    // Show ad for AD_WALL_TIME then grant bonus turns
    setTimeout(() => {
      setMaxTurns(FREE_TURNS + BONUS_TURNS);
      setPhase("chat");
    }, AD_WALL_TIME);
  };

  // Generate summary
  const handleFinish = async () => {
    if (!persona || !profile) return;
    setPhase("generating-summary");

    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          profile,
          messages,
          language,
        }),
      });

      if (!response.ok) throw new Error("Summary generation failed");
      const summary = await response.json();

      // Store everything for result page
      localStorage.setItem(
        "multiverse_result",
        JSON.stringify({ persona, messages, summary })
      );
      router.push("/result");
    } catch (err) {
      console.error(err);
      setError(
        language === "ko"
          ? "결과 생성에 실패했습니다."
          : "Failed to generate summary."
      );
      setPhase("chat");
    }
  };

  const turnsRemaining = maxTurns - turnCount;
  const isAtLimit = turnCount >= maxTurns;
  const canExtend = maxTurns === FREE_TURNS;

  // ===== LOADING PHASE =====
  if (phase === "loading") {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
          {/* Ad Banner */}
          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING || ""}
            format="rectangle"
            className="mb-8 w-full"
          />

          {/* Loading animation */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>

            <p className="text-lg font-medium mb-4 animate-pulse">
              {loadingMessages[language][loadingMsgIdx]}
            </p>

            {/* Progress bar */}
            <div className="w-64 mx-auto h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {error && (
              <div className="mt-6">
                <p className="text-sm text-red-500 mb-3">{error}</p>
                <Button size="sm" onClick={() => router.push("/branch")}>
                  {language === "ko" ? "다시 시도" : "Try again"}
                </Button>
              </div>
            )}
          </div>
        </main>
      </>
    );
  }

  // ===== AD WALL PHASE =====
  if (phase === "ad-wall") {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
          <div className="text-center mb-8">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {language === "ko"
                ? "대화를 더 이어가시겠어요?"
                : "Want to keep talking?"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "ko"
                ? "잠시 후 3턴을 더 대화할 수 있습니다."
                : `You'll get ${BONUS_TURNS} more turns in a moment.`}
            </p>
          </div>

          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING || ""}
            format="rectangle"
            className="mb-8 w-full"
          />

          <div className="flex gap-3 w-full max-w-xs">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleFinish}
            >
              {language === "ko" ? "결과 보기" : "See Results"}
            </Button>
            <Button className="flex-1" onClick={handleWatchAd}>
              {language === "ko" ? "3턴 더 대화" : `+${BONUS_TURNS} Turns`}
            </Button>
          </div>
        </main>
      </>
    );
  }

  // ===== GENERATING SUMMARY PHASE =====
  if (phase === "generating-summary") {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
          <AdBanner
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LOADING || ""}
            format="rectangle"
            className="mb-8 w-full"
          />
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-lg font-medium">
              {language === "ko"
                ? "대화를 정리하고 있어요..."
                : "Wrapping up your conversation..."}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === "ko"
                ? "평행우주에서 편지를 쓰는 중입니다."
                : "Your alternate self is writing you a letter."}
            </p>
          </div>
        </main>
      </>
    );
  }

  // ===== CHAT PHASE =====
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-20 pb-24">
        {/* Chat header */}
        {persona && (
          <div className="px-6 py-3 border-b border-border/50 bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary font-mono">
                  {persona.universeId}
                </p>
                <p className="text-sm font-semibold">{persona.title}</p>
              </div>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  turnsRemaining <= 1
                    ? "bg-red-500/10 text-red-500"
                    : "bg-primary/10 text-primary"
                )}
              >
                {language === "ko"
                  ? `💬 ${turnsRemaining}턴 남음`
                  : `💬 ${turnsRemaining} turns left`}
              </span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary/60 text-foreground rounded-bl-md"
                )}
              >
                {msg.role === "assistant" && (
                  <p className="text-[10px] text-muted-foreground mb-1 font-mono">
                    {persona?.universeId}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isStreaming && messages[messages.length - 1]?.content === "" && (
            <div className="flex justify-start">
              <div className="bg-secondary/60 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input or CTA */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] bg-background/90 backdrop-blur-md border-t border-border/50 p-4">
          {isAtLimit ? (
            <div className="flex gap-3">
              {canExtend ? (
                <>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleFinish}
                  >
                    {language === "ko" ? "결과 보기" : "See Results"}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setPhase("ad-wall")}
                  >
                    {language === "ko"
                      ? `💬 ${BONUS_TURNS}턴 더 대화`
                      : `💬 +${BONUS_TURNS} More Turns`}
                  </Button>
                </>
              ) : (
                <Button className="w-full" size="lg" onClick={handleFinish}>
                  {language === "ko" ? "대화 마무리하고 결과 보기" : "Finish & See Results"}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  language === "ko"
                    ? "평행우주의 나에게 말해보세요..."
                    : "Say something to your alternate self..."
                }
                className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isStreaming}
              />
              <Button
                size="md"
                className="h-12 w-12 p-0 rounded-xl"
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
              >
                {isStreaming ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
