"use client";

import { motion } from "framer-motion";

export default function AnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-soft shadow-soft-lg p-10 mb-10 text-center"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-teal/20 dark:bg-teal/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan/20 dark:bg-cyan/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-ink dark:text-dark-text">
          <span className="inline-block animate-bounce">👋</span> 欢迎来到我的小角落
        </h1>
        <p className="text-muted text-lg">
          写代码，也爱捣鼓有意思的事。这里记录着技术踩坑和日常思考。
        </p>
      </div>
    </motion.div>
  );
}
