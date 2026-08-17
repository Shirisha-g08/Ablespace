"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GuestLoginCard } from "@/components/GuestLoginCard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { api } from "@/lib/api";
import { getStoredAuth, saveAuth } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.accessToken) {
      router.replace("/tasks");
    }
  }, [router]);

  const handleGuestLogin = async (displayName: string) => {
    const payload = await api.guestLogin(displayName || undefined);
    saveAuth(payload);
    router.push("/tasks");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <ThemeSwitcher />
      </div>
      <GuestLoginCard onLogin={handleGuestLogin} />
    </main>
  );
}
