"use client";

import { useState } from "react";
import {
  Award,
  BarChart3,
  Code,
  FileSearch,
  FileText,
  MessageSquare,
  MonitorSmartphone,
  Search,
  Send,
  Target,
  Terminal,
  Wrench,
} from "lucide-react";
import { certs, glossary, jobTips, nextSkills } from "@/data/beyond";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "./ui";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, FileSearch, BarChart3, MonitorSmartphone, Target, Code,
  FileText, MessageSquare, Wrench, Send, Award,
};

type SubTab = "skills" | "certs" | "jobs" | "glossary";

export function BeyondView() {
  const [sub, setSub] = useState<SubTab>("skills");
  const [gq, setGq] = useState("");

  const subTabs: { id: SubTab; label: string }[] = [
    { id: "skills", label: "المهارات التالية" },
    { id: "certs", label: "خارطة الشهادات" },
    { id: "jobs", label: "نصائح التوظيف" },
    { id: "glossary", label: "قاموس المصطلحات" },
  ];

  const filteredGlossary = glossary.filter(
    (g) =>
      !gq.trim() ||
      g.term.toLowerCase().includes(gq.toLowerCase()) ||
      g.ar.includes(gq) ||
      g.desc.includes(gq)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="ما بعد الكورسات — الطريق الفعلي لوظيفة SOC"
        sub="الشبكات وحدها لا توظفك: هذه المرحلة تحول معرفتك إلى مهارات عملية وملف تقديم قوي."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-bold transition-colors",
              sub === t.id ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* المهارات التالية */}
      {sub === "skills" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {nextSkills.map((s) => {
            const Icon = iconMap[s.icon] ?? Target;
            return (
              <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-extrabold text-slate-900">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.why}</p>
                <ul className="mt-3 space-y-1.5">
                  {s.resources.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-xs text-slate-500">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* الشهادات */}
      {sub === "certs" && (
        <div className="space-y-3">
          {certs.map((c, i) => (
            <div
              key={c.name}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-sm font-black text-white">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-slate-900">{c.name}</h3>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                    {c.vendor}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      c.level === "بداية"
                        ? "bg-emerald-50 text-emerald-600"
                        : c.level === "متوسط"
                        ? "bg-sky-50 text-sky-600"
                        : "bg-amber-50 text-amber-600"
                    )}
                  >
                    {c.level}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{c.why}</p>
              </div>
            </div>
          ))}
          <p className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
            الترتيب مقترح وليس إلزاميًا: ابدأ بـ Security+ بالتوازي مع مسار TryHackMe العملي —
            الشهادة تفتح باب الفرز، والتمارين العملية تُجتاز المقابلة.
          </p>
        </div>
      )}

      {/* نصائح التوظيف */}
      {sub === "jobs" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {jobTips.map((g) => {
            const Icon = iconMap[g.icon] ?? Target;
            return (
              <div key={g.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-extrabold text-slate-900">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {g.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-black text-blue-700">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* القاموس */}
      {sub === "glossary" && (
        <div>
          <div className="relative mb-5 max-w-md">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={gq}
              onChange={(e) => setGq(e.target.value)}
              placeholder="ابحث عن مصطلح (SOC, SIEM, IOC...)"
              className="pr-9"
              aria-label="بحث في القاموس"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGlossary.map((g) => (
              <div key={g.term} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-mono text-sm font-black text-blue-700" dir="ltr">
                    {g.term}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400">{g.ar}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{g.desc}</p>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <p className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
                لا نتائج لهذا البحث
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
