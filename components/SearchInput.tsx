"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="搜索文章..."
          className="w-full border border-white/40 dark:border-white/10 rounded-soft px-4 py-3 text-lg bg-white/50 dark:bg-dark-surface/50 backdrop-blur-md focus:outline-none focus:border-teal/50 focus:shadow-glow transition-all text-ink dark:text-dark-text placeholder:text-muted"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
