"use client";

import { useEffect, useState } from "react";
import { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projects),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { name: "", description: "", tech: [], link: "", github: "" },
    ]);
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const updated = [...projects];
    (updated[index] as any)[field] = value;
    setProjects(updated);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-dark-text">
          📂 项目管理
        </h1>
        <div className="flex gap-2">
          <button
            onClick={addProject}
            className="bg-teal/20 hover:bg-teal/30 border border-teal/30 rounded-soft px-4 py-2 text-sm font-semibold text-ink dark:text-dark-text transition-all"
          >
            + 添加项目
          </button>
          <button
            onClick={save}
            className="bg-teal/40 hover:bg-teal/50 border border-teal/50 rounded-soft px-4 py-2 text-sm font-semibold text-ink dark:text-dark-text transition-all"
          >
            {saved ? "✓ 已保存" : "保存"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl rounded-soft border border-white/30 dark:border-white/10 p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                value={proj.name}
                onChange={(e) => updateProject(i, "name", e.target.value)}
                placeholder="项目名称"
                className="bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
              />
              <input
                value={proj.link || ""}
                onChange={(e) => updateProject(i, "link", e.target.value)}
                placeholder="链接"
                className="bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
              />
              <input
                value={proj.tech.join(", ")}
                onChange={(e) =>
                  updateProject(
                    i,
                    "tech",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="技术栈（逗号分隔）"
                className="sm:col-span-2 bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50"
              />
              <textarea
                value={proj.description}
                onChange={(e) =>
                  updateProject(i, "description", e.target.value)
                }
                placeholder="项目描述"
                rows={2}
                className="sm:col-span-2 bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:border-teal/50 resize-none"
              />
            </div>
            <button
              onClick={() => removeProject(i)}
              className="mt-2 text-xs text-red-400 hover:text-red-600"
            >
              删除此项目
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
