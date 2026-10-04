// All site copy lives here. Every value marked TODO is a placeholder —
// replace it with Jayesh's real details before going live.

export const profile = {
  name: "Jayesh Adhikari",
  role: "TODO: Role / Title", // e.g. "Full-Stack Developer"
  tagline: "TODO: One-line tagline about what Jayesh does and for whom.",
  location: "TODO: City, Country",
  email: "TODO@example.com",
  resumeUrl: "", // e.g. "/resume.pdf" (put the file in /public)
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
  ],
  about: [
    "TODO: Paragraph one — who Jayesh is and what he focuses on.",
    "TODO: Paragraph two — background, approach, what he's looking for next.",
  ],
  stats: [
    { value: "TODO", label: "Years experience" },
    { value: "TODO", label: "Projects shipped" },
    { value: "TODO", label: "Clients / teams" },
  ],
  skills: [
    { group: "TODO: Group A", items: ["Skill", "Skill", "Skill", "Skill"] },
    { group: "TODO: Group B", items: ["Skill", "Skill", "Skill"] },
    { group: "TODO: Group C", items: ["Skill", "Skill", "Skill"] },
  ],
  experience: [
    {
      period: "TODO – Present",
      title: "TODO: Job title",
      org: "TODO: Company",
      summary: "TODO: What Jayesh did and the measurable result.",
    },
    {
      period: "TODO – TODO",
      title: "TODO: Job title",
      org: "TODO: Company",
      summary: "TODO: What Jayesh did and the measurable result.",
    },
  ],
  projects: [
    {
      title: "TODO: Project one",
      description: "TODO: Problem, what was built, outcome.",
      tags: ["Tag", "Tag"],
      href: "",
    },
    {
      title: "TODO: Project two",
      description: "TODO: Problem, what was built, outcome.",
      tags: ["Tag", "Tag"],
      href: "",
    },
    {
      title: "TODO: Project three",
      description: "TODO: Problem, what was built, outcome.",
      tags: ["Tag", "Tag"],
      href: "",
    },
  ],
} as const;

export type Profile = typeof profile;
