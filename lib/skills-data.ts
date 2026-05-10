import skillsRaw from "@/data/marketing-skills-ko.json";

export interface Skill {
  id: string;
  name: string;
  nameKo: string;
  category: string;
  categoryKo: string;
  description: string;
  simpleDescription: string;
  claudeUsage: string;
  codexUsage: string;
  relatedSkills: string[];
}

export const skills: Skill[] = skillsRaw as Skill[];

export const categories = Array.from(
  new Map(skills.map((s) => [s.category, s.categoryKo])).entries()
).map(([id, label]) => ({ id, label }));

export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function getSkillsByCategory(category: string): Skill[] {
  if (category === "all") return skills;
  return skills.filter((s) => s.category === category);
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase();
  return skills.filter(
    (s) =>
      s.nameKo.includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.description.includes(q) ||
      s.simpleDescription.includes(q)
  );
}
