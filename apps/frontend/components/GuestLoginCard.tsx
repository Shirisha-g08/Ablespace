"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

interface GuestLoginCardProps {
  onLogin: (displayName: string) => Promise<void>;
}

export function GuestLoginCard({ onLogin }: GuestLoginCardProps) {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await onLogin(displayName.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass w-full max-w-md rounded-3xl border p-6 shadow-soft sm:p-8">
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight">Task Management System</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Start instantly with a guest account and organize your work by status and priority.
        </p>
      </div>

      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
        Guest Name (Optional)
      </label>
      <input
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
        placeholder="Ex: Alex"
        className="mb-4 w-full rounded-xl border bg-[var(--card)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
      />

      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold text-[var(--accent-foreground)] transition hover:translate-y-[-1px] disabled:opacity-60"
      >
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        Continue As Guest
      </button>

      {error && <p className="mt-3 text-xs text-[var(--danger)]">{error}</p>}
    </section>
  );
}
