"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/types";

export function ProjectsPageClient({ projects }: { projects: Project[] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-ink dark:text-dark-text"
      >
        📂 项目
      </motion.h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="doodle-card h-full flex flex-col">
              <h2 className="font-bold text-lg mb-2 text-ink dark:text-dark-text">
                {project.name}
              </h2>
              <p className="text-sm text-muted mb-3 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tech.map((t) => (
                  <span key={t} className="doodle-tag text-xs">
                    {t}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-teal hover:underline"
                >
                  查看项目 →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
