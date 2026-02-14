// ===== V3: Multiverse Chat + Branch =====

export type AgeGroup = "10s" | "20s" | "30s" | "40s" | "50s+";
export type Gender = "male" | "female" | "other" | "skip";
export type Mood = "warm" | "dramatic" | "realistic" | "cynical";

export type ScenarioCategory =
  | "career"
  | "love"
  | "place"
  | "education"
  | "lifestyle"
  | "random";

export interface ScenarioItem {
  id: string;
  category: ScenarioCategory;
  label: { en: string; ko: string };
  prompt: { en: string; ko: string };
}

export interface UserProfile {
  nickname: string;
  ageGroup: AgeGroup;
  gender: Gender;
}

export interface BranchSelection {
  category: ScenarioCategory;
  scenarioId: string; // preset ID or "custom"
  customText?: string; // only if scenarioId === "custom"
  mood: Mood;
}

export interface Persona {
  universeId: string;
  title: string;
  name: string;
  age: number;
  job: string;
  location: string;
  personality: string;
  speakingStyle: string;
  currentSituation: string;
  coreMemory: string;
  greeting: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface SummaryResult {
  universeId: string;
  title: string;
  oneLiner: string;
  comparison: {
    reality: { job: string; location: string; lifestyle: string };
    multiverse: { job: string; location: string; lifestyle: string };
  };
  bestMoment: {
    speaker: "user" | "multiverse";
    quote: string;
  };
  letter: string;
  suggestedScenarios: {
    category: ScenarioCategory;
    scenarioId: string;
    label: string;
  }[];
}

// ===== V1 Legacy (keep for backward compat) =====

export interface MultiverseStory {
  universe_id: string;
  world_name: string;
  title?: string;
  core_difference: string;
  one_line_summary: string;
  profile: {
    age: number;
    job: string;
    residence: string;
    routine: {
      morning: string;
      afternoon: string;
      night: string;
    };
    main_worry: string;
    self_description: string;
  };
  stats: {
    wealth: number;
    happiness: number;
    health: number;
    reputation: number;
    love: number;
  };
  timeline: {
    age: number;
    year: number;
    event: string;
  }[];
  moments: {
    title: string;
    description: string;
  }[];
  analysis: {
    gained: string[];
    lost: string[];
    envy_point: string;
    anxiety_point: string;
  };
  message_to_reality: string;
  teaser: string;
  full_story?: string;
}
