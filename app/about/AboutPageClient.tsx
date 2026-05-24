"use client";

import { motion } from "framer-motion";

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

export function AboutPageClient({ data }: { data: AboutData }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="doodle-card mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-teal/30 border border-teal/40 rounded-full flex items-center justify-center text-3xl">
              👨‍💻
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink dark:text-dark-text">
                武怡安
              </h1>
              <p className="text-muted">Java 开发工程师 · 5 年经验</p>
            </div>
          </div>
          <p className="text-muted leading-relaxed">{data.intro}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-4 text-ink dark:text-dark-text">
            🛠️ 技能
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="doodle-tag cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {data.experiences.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-ink dark:text-dark-text">
              💼 工作经历
            </h2>
            {data.experiences.map((exp, i) => (
              <div key={i} className="doodle-card mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-ink dark:text-dark-text">
                    {exp.company}
                  </h3>
                  <span className="text-sm text-muted">{exp.period}</span>
                </div>
                <p className="text-sm font-semibold text-teal mb-2">
                  {exp.role}
                </p>
                <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {data.education.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-ink dark:text-dark-text">
              🎓 教育背景
            </h2>
            {data.education.map((edu, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-white/20 dark:border-white/5"
              >
                <span className="font-medium text-ink dark:text-dark-text">
                  {edu.school}
                </span>
                <div className="text-right">
                  <span className="text-sm text-muted">{edu.degree}</span>
                  <span className="text-xs text-muted ml-3">{edu.period}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center"
        >
          <a href="/resume.pdf" download className="doodle-button">
            📄 下载完整简历（PDF）
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
