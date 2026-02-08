import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

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
});

export async function POST(req: Request) {
    try {
        const {
            nickname, age, gender, job, residence,
            worry, emotion, satisfaction,
            decisionStyle, personality, values,
            whatIf, desire, constraint
        } = await req.json();

        const result = await generateObject({
            model: openai("gpt-4o"),
            schema: storySchema,
            system: `
Role: You are the "Multiverse Archivist". You observe and record parallel timelines.
Tone: Cinematic, Emotional, Insightful, and Realistically Bitter-sweet (Black Mirror style).
Language: Korean (Always use Korean unless the user explicitly inputs in English).

Task:
Create a "Multiverse Observation Report" based on the User's Reality and 'What If' choice.

Rules:
1. **Persona**: You are not a simple AI. You are a narrator observing a real life.
2. **Reality Anchor**: The alternate 'Me' must feel like the same person, just in a different situation.
3. **Trade-offs (CRITICAL)**: NEVER create a perfect utopia. Every gain has a loss. 
   - If they became rich, they might have lost detailed memories or true friends.
   - If they chose love, they might have sacrificed their career ambition.
   - The result should feel "Real" and "Plausible", not like a fairy tale.
4. **Show, Don't Tell**: In the 'Moments' section, describe sensory details (smell, sound, light).
5. **Output Format**: STRICTLY return valid JSON.

Data Context:
- Wealth/Happiness/Health/etc are 0-100. Be harsh. 100 is impossible. A realistic successful life is 70-80.
            `,
            prompt: `
[User Reality]
- Nickname: ${nickname}
- Age: ${age}
- Gender: ${gender}
- Job: ${job}
- Residence: ${residence}
- Current State: ${emotion}, Worrying about "${worry}". Satisfaction ${satisfaction}/10.
- Personality: ${decisionStyle}, ${personality}
- Values: ${values}

[The Divergence]
- What If: "${whatIf}"
- Hidden Desire: "${desire || 'N/A'}"
- Reality Constraint: "${constraint || 'N/A'}"

Generate the Multiverse Report now.
            `,
        });

        return result.toJsonResponse();
    } catch (error) {
        console.error("Generation error:", error);
        return new Response("Failed to generate story", { status: 500 });
    }
}
