"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoc, type Tab } from "@/lib/store";
import { totalSteps } from "@/data/path";
import { Progress } from "./ui";
import { useMounted } from "@/hooks/use-mounted";

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "الرئيسية" },
  { id: "path", label: "المسار التسلسلي" },
  { id: "priorities", label: "الأولويات" },
  { id: "playlists", label: "القوائم الخمس" },
  { id: "compare", label: "المقارنات" },
  { id: "beyond", label: "ما بعد الكورسات" },
];

export function Header() {
  const { tab, setTab, done } = useSoc();
  const mounted = useMounted();

  const doneCount = mounted ? Object.values(done).filter(Boolean).length : 0;
  const pct = Math.round((doneCount / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={() => setTab("home")}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label="الصفحة الرئيسية"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <span className="text-right">
              <span className="block text-base font-extrabold leading-tight text-slate-900">
                مسار SOC
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                من الشبكات إلى الأمن السيبراني
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-3 sm:flex" aria-label="نسبة الإنجاز">
            <div className="text-left">
              <div className="text-xs font-bold text-blue-700">{pct}% مكتمل</div>
              <div className="text-[10px] text-slate-400 font-mono" dir="ltr">
                {doneCount}/{totalSteps}
              </div>
            </div>
            <Progress value={pct} className="w-36" />
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto pb-2 custom-scroll" aria-label="أقسام الموقع">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-bold transition-colors",
                tab === t.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
              )}
              aria-current={tab === t.id ? "page" : undefined}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const setTab = useSoc((s) => s.setTab);
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-right">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldHalf className="h-4 w-4 text-blue-600" />
            <span>
              خطتك لبناء <b className="text-slate-700">SOC Analyst</b> — بنيت على تحليل محتوى 5 قوائم كاملة
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button onClick={() => setTab("path")} className="font-bold text-blue-600 hover:underline">
              ابدأ المسار الآن
            </button>
            <span>تقدمك محفوظ تلقائيًا في متصفحك</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
