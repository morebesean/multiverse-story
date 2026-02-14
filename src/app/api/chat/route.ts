import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { buildChatSystemPrompt } from "@/lib/prompts";
import type { Persona, UserProfile, ChatMessage } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const persona: Persona = body.persona;
    const profile: UserProfile = body.profile;
    const messages: ChatMessage[] = body.messages;
    const turnNumber: number = body.turnNumber;
    const maxTurns: number = body.maxTurns;
    const language: string = body.language || "en";

    const systemPrompt = buildChatSystemPrompt(
      persona,
      profile,
      turnNumber,
      maxTurns,
      language
    );

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat error:", error);
    return new Response("Failed to generate response", { status: 500 });
  }
}
