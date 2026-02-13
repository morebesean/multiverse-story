import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Vercel Edge Runtime 사용 (빠른 응답 속도)
export const runtime = "edge";

// Define the schema for the Multiverse Report
const storySchema = z.object({
    universe_id: z.string().describe("Like WORLD-XX-00"),
    world_name: z.string(),
    core_difference: z.string(),
    one_line_summary: z.string(),
    profile: z.object({
        age: z.number(),
        job: z.string(),
        residence: z.string(),
        routine: z.object({
            morning: z.string(),
            afternoon: z.string(),
            night: z.string(),
        }),
        main_worry: z.string(),
        self_description: z.string(),
    }),
    stats: z.object({
        wealth: z.number().min(0).max(100),
        happiness: z.number().min(0).max(100),
        health: z.number().min(0).max(100),
        reputation: z.number().min(0).max(100),
        love: z.number().min(0).max(100),
    }),
    timeline: z.array(z.object({
        age: z.number(),
        year: z.number(),
        event: z.string(),
    })).describe("3-4 key milestones"),
    moments: z.array(z.object({
        title: z.string(),
        description: z.string(),
    })).describe("2 cinematic scenes"),
    analysis: z.object({
        gained: z.array(z.string()),
        lost: z.array(z.string()),
        envy_point: z.string(),
        anxiety_point: z.string(),
    }),
    message_to_reality: z.string(),
    teaser: z.string(),
    full_story: z.string().describe("A long, detailed narrative description of the user's life in this universe (approx 400-600 characters)."),
});

export async function POST(req: Request) {
    try {
        const { nickname, age, job, whatIf } = await req.json();

        const result = await generateObject({
            model: openai("gpt-4o"),
            schema: storySchema,
            system: `
Role: You are the "Multiverse Archivist". You observe and record parallel timelines.
Tone: Cinematic, Emotional, Insightful, and Realistically Bitter-sweet (Black Mirror style).
Language: Detect the language of the user's input (especially the 'What If' field). MUST write ALL output in that same language. For example, if the user writes in Korean, respond entirely in Korean. If in English, respond in English. If in Spanish, respond in Spanish. Match the user's language exactly.

Task:
Create a "Multiverse Observation Report" based on the User's Reality and 'What If' choice.

Rules:
1. **Persona**: You are not a simple AI. You are a narrator observing a real life.
2. **Reality Anchor**: The alternate 'Me' must feel like the same person, just in a different situation.
3. **Trade-offs (CRITICAL)**: NEVER create a perfect utopia. Every gain has a loss.
   - If they became rich, they might have lost detailed memories or true friends.
   - If they chose love, they might have sacrificed their career ambition.
   - The result should feel "Real" and "Plausible", not like a fairy tale.
4. **Infer Context**: You only have minimal user info (name, birth year, job, and their 'What If' choice).
   From these 4 inputs, creatively infer and flesh out the following for a rich story:
   - Their personality, values, and emotional state
   - Their living situation and social relationships
   - Their hidden desires and fears
   - The realistic consequences of taking the alternate path
   Make all inferred details feel natural and plausible based on the combination of their age, job, and the nature of their 'What If'.
5. **Full Story**: In the 'full_story' section, write a deep, immersive narrative about this version of 'Me'. Describe how they feel about their choices and their current daily atmosphere. (Min 5-6 sentences).
6. **Show, Don't Tell**: In the 'Moments' section, describe sensory details (smell, sound, light).
7. **Output Format**: STRICTLY return valid JSON.

Data Context:
- Wealth/Happiness/Health/etc are 0-100. Be harsh. 100 is impossible. A realistic successful life is 70-80.
            `,
            prompt: `
[User Reality]
- Name: ${nickname}
- Birth Year: ${age}
- Current Job: ${job}

[The Divergence]
- What If: "${whatIf}"

Generate the Multiverse Report now.
            `,
        });

        return result.toJsonResponse();
    } catch (error) {
        console.error("Generation error:", error);
        return new Response("Failed to generate story", { status: 500 });
    }
}
