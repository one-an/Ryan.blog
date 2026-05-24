import { AboutPageClient } from "./AboutPageClient";
import { readJsonFile } from "@/lib/file-store";

interface AboutData {
  intro: string;
  skills: string[];
  experiences: {
    period: string;
    company: string;
    role: string;
    highlights: string[];
  }[];
  education: { period: string; school: string; degree: string }[];
}

export default function AboutPage() {
  const data = readJsonFile<AboutData>("about.json", {
    intro: "嘿！我是武怡安，一个热爱技术的 Java 开发者。",
    skills: ["Java", "Spring Boot", "Spring Cloud"],
    experiences: [],
    education: [],
  });

  return <AboutPageClient data={data} />;
}
