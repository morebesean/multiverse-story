import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { buildPersonaSystemPrompt } from "@/lib/prompts";
import { getScenarioById } from "@/lib/scenarios";
import type { UserProfile, Mood } from "@/lib/types";

export const runtime = "edge";

const personaSchema = z.object({
  universeId: z.string(),
  title: z.string(),
  name: z.string(),
  age: z.number(),
  job: z.string(),
  location: z.string(),
  personality: z.string(),
  speakingStyle: z.string(),
  currentSituation: z.string(),
  coreMemory: z.string(),
  greeting: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const profile: UserProfile = body.profile;
    const scenarioId: string = body.scenarioId;
    const customText: string | undefined = body.customText;
    const mood: Mood = body.mood;
    const language: string = body.language || "en";

    // Resolve scenario prompt
    let scenarioPrompt: string;
    if (scenarioId === "custom" && customText) {
      scenarioPrompt = customText;
    } else {
      const scenario = getScenarioById(scenarioId);
      if (!scenario) {
        return new Response("Invalid scenario", { status: 400 });
      }
      scenarioPrompt = scenario.prompt[language as "en" | "ko"] || scenario.prompt.en;
    }

    const systemPrompt = buildPersonaSystemPrompt(profile, scenarioPrompt, mood, language);

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: personaSchema,
      system: systemPrompt,
      prompt: `Create the alternate-universe persona now. Remember: ALL text fields must be in ${language === "ko" ? "Korean" : "the language matching the scenario"}.`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Persona generation error:", error);
    return new Response("Failed to generate persona", { status: 500 });
  }
}
