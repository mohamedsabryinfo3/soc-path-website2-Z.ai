"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tab = "home" | "path" | "priorities" | "playlists" | "compare" | "beyond";

interface SocStore {
  tab: Tab;
  setTab: (t: Tab) => void;
  done: Record<number, boolean>; // رقم الخطوة → تمّت
  toggleDone: (order: number) => void;
  resetProgress: () => void;
  jumpStep: number | null; // طلب الانتقال لخطوة محددة في صفحة المسار
  setJumpStep: (o: number | null) => void;
}

export const useSoc = create<SocStore>()(
  persist(
    (set) => ({
      tab: "home",
      setTab: (t) => set({ tab: t }),
      done: {},
      toggleDone: (order) =>
        set((s) => ({ done: { ...s.done, [order]: !s.done[order] } })),
      resetProgress: () => set({ done: {}, jumpStep: null }),
      jumpStep: null,
      setJumpStep: (o) => set({ jumpStep: o }),
    }),
    { name: "soc-path-progress" }
  )
);
