import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { buildSummarySystemPrompt } from "@/lib/prompts";
import type { Persona, UserProfile, ChatMessage } from "@/lib/types";

export const runtime = "edge";

const summarySchema = z.object({
  universeId: z.string(),
  title: z.string(),
  oneLiner: z.string(),
  comparison: z.object({
    reality: z.object({
      job: z.string(),
      location: z.string(),
      lifestyle: z.string(),
    }),
    multiverse: z.object({
      job: z.string(),
      location: z.string(),
      lifestyle: z.string(),
    }),
  }),
  bestMoment: z.object({
    speaker: z.enum(["user", "multiverse"]),
    quote: z.string(),
  }),
  letter: z.string(),
  suggestedScenarios: z.array(
    z.object({
      category: z.string(),
      scenarioId: z.string(),
      label: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const persona: Persona = body.persona;
    const profile: UserProfile = body.profile;
    const messages: ChatMessage[] = body.messages;
    const language: string = body.language || "en";

    const systemPrompt = buildSummarySystemPrompt(persona, profile, messages, language);

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: summarySchema,
      system: systemPrompt,
      prompt: `Analyze the conversation and create the summary report now. ALL text in ${language === "ko" ? "Korean" : "the conversation's language"}.`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Summary generation error:", error);
    return new Response("Failed to generate summary", { status: 500 });
  }
}
