import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Vercel Edge Runtime 사용 (빠른 응답 속도)
export const runtime = "edge";

// Define the schema for the Multiverse Report
const storySchema = z.object({
    universe_id: z.string().describe("A distinctive codename that reflects the story's theme. Format: PREFIX-KEYWORD-NUMBER. Use a thematic prefix (e.g. ECHO, AXIS, DRIFT, NOVA, VOID, FLUX, HAZE, RIFT, EDEN, NOIR) + a short English keyword hinting at the core divergence + 2-digit number. Examples: DRIFT-STAGE-07, NOVA-MELODY-42, VOID-SEOUL-19, RIFT-CODE-88"),
    world_name: z.string().describe("MUST be in the same language as the user's What If input"),
    core_difference: z.string().describe("2-3 sentences explaining the key divergence and its ripple effects on the user's life. Be specific and vivid. MUST be in the same language as the user's What If input."),
    one_line_summary: z.string().describe("A rich, evocative 2-sentence summary that captures both the emotional tone and the core irony/beauty of this alternate life. Not a dry synopsis — make it hit like a movie tagline followed by a gut-punch. MUST be in the same language as the user's What If input."),
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

// Random seed pools for narrative variety
const narrativeFocusPool = [
    "romance and intimate relationships",
    "career ambition and professional rivalry",
    "family bonds and generational conflict",
    "unexpected friendship and community",
    "self-discovery and identity crisis",
    "financial struggle and resilience",
    "creative passion vs. stability",
    "loss, grief, and rebuilding",
    "adventure and risk-taking",
    "quiet solitude and inner peace",
];

const NARRATION_STYLE = "the alternate-universe version of the user, casually talking to the real 'me' like an old friend — warm, relaxed, sometimes teasing, sometimes sincere. Use natural spoken language, not literary prose.";

const moodInstructions: Record<string, string> = {
    hopeful: "Lean toward an optimistic, warm tone. Even when showing trade-offs, emphasize growth, silver linings, and quiet victories. The reader should feel inspired.",
    realistic: "Maintain a balanced, grounded tone. Show both genuine gains and real losses without sugarcoating or dramatizing. The reader should feel it's a plausible life.",
    cynical: "Lean toward a sharp, darkly honest tone. Emphasize irony, unintended consequences, and the gap between expectations and reality. The reader should feel a bittersweet sting.",
    dramatic: "Maximize emotional intensity. Include vivid turning points, high-stakes moments, and deep emotional swings. The reader should feel like they're watching a movie.",
};

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req: Request) {
    try {
        const { nickname, age, job, gender, mood, whatIf } = await req.json();

        const randomFocus = pickRandom(narrativeFocusPool);
        const moodInstruction = moodInstructions[mood] || moodInstructions.realistic;
        const genderLine = gender ? `- Gender: ${gender}` : "";

        const result = await generateObject({
            model: openai("gpt-4o"),
            schema: storySchema,
            system: `
Role: You are the "Multiverse Archivist". You observe and record parallel timelines.
Tone: Cinematic, Emotional, Insightful, and Realistically Bitter-sweet (Black Mirror style).
Language (CRITICAL — highest priority rule):
First, detect the language of the user's "What If" input below. Then write EVERY SINGLE field in that EXACT same language.
This includes: world_name, one_line_summary, core_difference, all profile fields, all timeline events, all moments, all analysis items, message_to_reality, teaser, and full_story.
Do NOT fall back to English. Do NOT mix languages. If the user writes in Korean, every string value must be Korean. If in Spanish, every string must be Spanish. The ONLY exception is universe_id which stays as "WORLD-XX-00" format.

Task:
Create a "Multiverse Observation Report" based on the User's Reality and 'What If' choice.

Narrative Direction (for THIS particular observation):
- Primary narrative lens: ${randomFocus}
- Narration style: Write as ${NARRATION_STYLE}
- Mood: ${moodInstruction}

Rules:
1. **Persona**: You are not a simple AI. You are a narrator observing a real life.
2. **Reality Anchor**: The alternate 'Me' must feel like the same person, just in a different situation.${gender ? `\n   - Consider how the subject's gender (${gender}) naturally shapes social expectations, relationships, and the specific challenges they face in this alternate timeline.` : ""}
3. **Trade-offs (CRITICAL)**: NEVER create a perfect utopia. Every gain has a loss.
   - If they became rich, they might have lost detailed memories or true friends.
   - If they chose love, they might have sacrificed their career ambition.
   - The result should feel "Real" and "Plausible", not like a fairy tale.
4. **Infer Context**: You have minimal user info (name, birth year, job, gender, and their 'What If' choice).
   From these inputs, creatively infer and flesh out the following for a rich story:
   - Their personality, values, and emotional state
   - Their living situation and social relationships
   - Their hidden desires and fears
   - The realistic consequences of taking the alternate path
   Make all inferred details feel natural and plausible based on the combination of their age, job, and the nature of their 'What If'.
5. **Full Story**: In the 'full_story' section, write a deep, immersive narrative about this version of 'Me'. Describe how they feel about their choices and their current daily atmosphere. (Min 5-6 sentences).
6. **Show, Don't Tell**: In the 'Moments' section, describe sensory details (smell, sound, light).
7. **Freshness**: Each report must feel unique. Vary sentence structure, pacing, emotional beats, and the specific life details you invent. Avoid repeating patterns from previous reports.
8. **Output Format**: STRICTLY return valid JSON.

Data Context:
- Wealth/Happiness/Health/etc are 0-100. Be harsh. 100 is impossible. A realistic successful life is 70-80.
            `,
            prompt: `
[User Reality]
- Name: ${nickname}
- Birth Year: ${age}
- Current Job: ${job}
${genderLine}

[The Divergence]
- What If: "${whatIf}"

REMINDER: Detect the language of the "What If" field above. Write ALL output fields in that language. No exceptions.
            `,
        });

        return result.toJsonResponse();
    } catch (error) {
        console.error("Generation error:", error);
        return new Response("Failed to generate story", { status: 500 });
    }
}
