import { ProjectsPageClient } from "./ProjectsPageClient";
import { readJsonFile } from "@/lib/file-store";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const projects = readJsonFile<Project[]>("projects.json", []);
  return <ProjectsPageClient projects={projects} />;
}
