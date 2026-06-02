"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin/posts");
        router.refresh();
        return;
      }
      if (res.status === 429) {
        setError("尝试次数过多，请稍后再试");
      } else {
        setError("密码错误");
      }
    } catch {
      setError("网络错误");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3EEF5] dark:bg-dark-bg">
      <div className="bg-white/50 dark:bg-dark-surface/50 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-soft shadow-soft-lg p-10 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-ink dark:text-dark-text mb-2 text-center">
          Ryan.log
        </h1>
        <p className="text-muted mb-8 text-center">后台管理</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            autoFocus
            required
            disabled={submitting}
            className="w-full px-4 py-2 rounded-soft border border-white/40 dark:border-white/10 bg-white/60 dark:bg-dark-surface/60 text-ink dark:text-dark-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-teal/40 disabled:opacity-50"
          />
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal text-white px-6 py-2 rounded-soft font-semibold hover:bg-teal/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
}
