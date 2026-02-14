import type { ScenarioCategory, ScenarioItem } from "./types";

export const categories: {
  id: ScenarioCategory;
  label: { en: string; ko: string };
  emoji: string;
}[] = [
  { id: "career", label: { en: "Career & Work", ko: "커리어 & 직업" }, emoji: "💼" },
  { id: "love", label: { en: "Love & Relationships", ko: "사랑 & 관계" }, emoji: "💕" },
  { id: "place", label: { en: "Place & Environment", ko: "장소 & 환경" }, emoji: "🌍" },
  { id: "education", label: { en: "Education & Growth", ko: "교육 & 성장" }, emoji: "📚" },
  { id: "lifestyle", label: { en: "Money & Lifestyle", ko: "돈 & 라이프스타일" }, emoji: "💰" },
  { id: "random", label: { en: "Twist of Fate", ko: "운명의 장난" }, emoji: "🎲" },
];

export const scenarios: ScenarioItem[] = [
  // Career
  {
    id: "different_job",
    category: "career",
    label: { en: "Chose a completely different career?", ko: "전혀 다른 직업을 선택했다면?" },
    prompt: { en: "What if I had chosen a completely different career path?", ko: "전혀 다른 직업을 선택한 평행우주" },
  },
  {
    id: "started_business",
    category: "career",
    label: { en: "Started my own business?", ko: "창업을 했다면?" },
    prompt: { en: "What if I had started my own business?", ko: "창업을 한 평행우주" },
  },
  {
    id: "worked_abroad",
    category: "career",
    label: { en: "Worked in another country?", ko: "해외에서 일했다면?" },
    prompt: { en: "What if I had moved abroad for work?", ko: "해외에서 일하게 된 평행우주" },
  },

  // Love
  {
    id: "confessed_love",
    category: "love",
    label: { en: "Confessed my feelings that day?", ko: "그때 고백했다면?" },
    prompt: { en: "What if I had confessed my love to that person?", ko: "그 사람에게 고백한 평행우주" },
  },
  {
    id: "stayed_together",
    category: "love",
    label: { en: "Didn't break up?", ko: "헤어지지 않았다면?" },
    prompt: { en: "What if I had stayed with that person?", ko: "그 사람과 계속 함께한 평행우주" },
  },
  {
    id: "married_early",
    category: "love",
    label: { en: "Got married early?", ko: "일찍 결혼했다면?" },
    prompt: { en: "What if I had gotten married at a young age?", ko: "일찍 결혼한 평행우주" },
  },

  // Place
  {
    id: "born_abroad",
    category: "place",
    label: { en: "Born in a different country?", ko: "다른 나라에서 태어났다면?" },
    prompt: { en: "What if I had been born in a completely different country?", ko: "다른 나라에서 태어난 평행우주" },
  },
  {
    id: "moved_countryside",
    category: "place",
    label: { en: "Lived in the countryside?", ko: "시골에서 살았다면?" },
    prompt: { en: "What if I had moved to the countryside?", ko: "시골에서 살게 된 평행우주" },
  },
  {
    id: "lived_big_city",
    category: "place",
    label: { en: "Moved to a big city?", ko: "대도시로 떠났다면?" },
    prompt: { en: "What if I had moved to a major global city?", ko: "대도시로 떠난 평행우주" },
  },

  // Education
  {
    id: "skipped_college",
    category: "education",
    label: { en: "Didn't go to college?", ko: "대학을 안 갔다면?" },
    prompt: { en: "What if I had skipped college entirely?", ko: "대학을 가지 않은 평행우주" },
  },
  {
    id: "different_major",
    category: "education",
    label: { en: "Studied something different?", ko: "다른 전공을 택했다면?" },
    prompt: { en: "What if I had studied a completely different major?", ko: "전혀 다른 전공을 택한 평행우주" },
  },
  {
    id: "studied_abroad",
    category: "education",
    label: { en: "Studied abroad?", ko: "유학을 갔다면?" },
    prompt: { en: "What if I had studied abroad?", ko: "유학을 간 평행우주" },
  },

  // Lifestyle
  {
    id: "inherited_money",
    category: "lifestyle",
    label: { en: "Inherited a fortune?", ko: "큰 돈을 물려받았다면?" },
    prompt: { en: "What if I had inherited a large fortune?", ko: "큰 돈을 물려받은 평행우주" },
  },
  {
    id: "became_famous",
    category: "lifestyle",
    label: { en: "Became famous?", ko: "유명인이 되었다면?" },
    prompt: { en: "What if I had become famous?", ko: "유명인이 된 평행우주" },
  },
  {
    id: "minimalist_life",
    category: "lifestyle",
    label: { en: "Gave up everything for simplicity?", ko: "모든 걸 버리고 단순하게 살았다면?" },
    prompt: { en: "What if I had given up everything to live a minimalist life?", ko: "모든 것을 버리고 미니멀하게 사는 평행우주" },
  },

  // Random
  {
    id: "time_travel",
    category: "random",
    label: { en: "Could go back 10 years?", ko: "10년 전으로 돌아간다면?" },
    prompt: { en: "What if I could go back 10 years with everything I know now?", ko: "지금의 기억을 가지고 10년 전으로 돌아간 평행우주" },
  },
  {
    id: "opposite_personality",
    category: "random",
    label: { en: "Had the opposite personality?", ko: "정반대 성격이었다면?" },
    prompt: { en: "What if I had the complete opposite personality?", ko: "정반대 성격을 가진 평행우주" },
  },
  {
    id: "random_fate",
    category: "random",
    label: { en: "🎲 Surprise me!", ko: "🎲 랜덤으로 정해줘!" },
    prompt: { en: "Create a completely unexpected and surprising alternate universe for me.", ko: "완전히 예상치 못한 놀라운 평행우주를 만들어줘." },
  },
];

export function getScenariosByCategory(category: ScenarioCategory): ScenarioItem[] {
  return scenarios.filter((s) => s.category === category);
}

export function getScenarioById(id: string): ScenarioItem | undefined {
  return scenarios.find((s) => s.id === id);
}
