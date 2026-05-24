"use client";

import { useEffect, useState } from "react";

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

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutData>({
    intro: "",
    skills: [],
    experiences: [],
    education: [],
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then(setAbout);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-ink dark:text-dark-text">
          👤 关于页
        </h1>
        <button
          onClick={save}
          className="bg-teal/40 hover:bg-teal/50 border border-teal/50 rounded-soft px-4 py-2 text-sm font-semibold text-ink dark:text-dark-text transition-all"
        >
          {saved ? "✓ 已保存" : "保存"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-muted mb-1">
            个人介绍
          </label>
          <textarea
            value={about.intro}
            onChange={(e) => setAbout({ ...about, intro: e.target.value })}
            rows={3}
            className="w-full bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text focus:outline-none focus:border-teal/50 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted mb-1">
            技能（逗号分隔）
          </label>
          <input
            value={about.skills.join(", ")}
            onChange={(e) =>
              setAbout({
                ...about,
                skills: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="w-full bg-white/50 dark:bg-dark-surface/50 border border-white/30 dark:border-white/10 rounded-soft px-3 py-2 text-sm text-ink dark:text-dark-text focus:outline-none focus:border-teal/50"
          />
        </div>
        <p className="text-xs text-muted">
          工作经历和教育背景请直接编辑 content/about.json
          文件以保持结构完整性。
        </p>
      </div>
    </div>
  );
}
