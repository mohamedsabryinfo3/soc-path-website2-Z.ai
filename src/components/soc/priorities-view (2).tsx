"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allVideos, priorityCounts, priorityMeta } from "@/data";
import type { Priority, VStatus } from "@/data/types";
import { PriorityBadge, StatusBadge, SectionTitle } from "./ui";

export function PrioritiesView() {
  const [q, setQ] = useState("");
  const [prio, setPrio] = useState<"all" | Priority>("all");
  const [pl, setPl] = useState<"all" | string>("all");
  const [st, setSt] = useState<"all" | VStatus>("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allVideos.filter(({ v, pl: p }) => {
      if (prio !== "all" && v.p !== prio) return false;
      if (pl !== "all" && p.id !== pl) return false;
      if (st !== "all" && (v.st ?? "no") !== st) return false;
      if (query && !(v.t.toLowerCase().includes(query) || v.r.includes(query))) return false;
      return true;
    });
  }, [q, prio, pl, st]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="تصنيف الفيديوهات بالأولويات"
        sub={`كل فيديو من الـ 306 مصنف من منظور مسار SOC فقط: مهم / متوسط / فيما بعد / غير مهم — مع السبب. استخدم الفلاتر للتنقل بين القوائم والحالات.`}
      />

      {/* ملخص العدادات */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(priorityCounts) as Priority[]).map((k) => (
          <button
            key={k}
            onClick={() => setPrio(prio === k ? "all" : k)}
            className={`rounded-xl border p-3 text-center transition-all ${
              prio === k
                ? "border-blue-400 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-blue-200"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${priorityMeta[k].dot}`} />
              <span className="text-lg font-black font-mono text-slate-800" dir="ltr">
                {priorityCounts[k]}
              </span>
            </div>
            <div className="mt-1 text-xs font-bold text-slate-500">{priorityMeta[k].label}</div>
          </button>
        ))}
      </div>

      {/* شريط الفلاتر */}
      <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث بالاسم أو السبب..."
            className="pr-9"
            aria-label="بحث"
          />
        </div>
        <Select value={prio} onValueChange={(v) => setPrio(v as typeof prio)}>
          <SelectTrigger aria-label="الأولوية">
            <SelectValue placeholder="الأولوية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الأولويات</SelectItem>
            <SelectItem value="must">مهم</SelectItem>
            <SelectItem value="medium">متوسط</SelectItem>
            <SelectItem value="later">فيما بعد</SelectItem>
            <SelectItem value="skip">غير مهم</SelectItem>
          </SelectContent>
        </Select>
        <Select value={pl} onValueChange={setPl}>
          <SelectTrigger aria-label="القائمة">
            <SelectValue placeholder="القائمة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل القوائم</SelectItem>
            <SelectItem value="abeer301">عبير — CCNA 200-301</SelectItem>
            <SelectItem value="nazmy301">نظمي — 200-301 + ENCOR</SelectItem>
            <SelectItem value="nazmy125">نظمي — CCNA 200-125</SelectItem>
            <SelectItem value="abeer125">عبير — CCNA 200-125</SelectItem>
            <SelectItem value="abeerEncor">عبير — ENCOR 350-401</SelectItem>
          </SelectContent>
        </Select>
        <Select value={st} onValueChange={(v) => setSt(v as typeof st)}>
          <SelectTrigger aria-label="الحالة">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الحالات</SelectItem>
            <SelectItem value="selected">مختار للمسار</SelectItem>
            <SelectItem value="alt">مرجع بديل / مكمل</SelectItem>
            <SelectItem value="no">غير مختار</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mb-4 text-xs font-bold text-slate-400">
        عرض {filtered.length} فيديو من أصل {allVideos.length}
      </p>

      {/* القائمة */}
      <div className="space-y-2.5">
        {filtered.map(({ v, pl: p }, i) => (
          <div
            key={`${p.id}-${v.n}-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-200"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-500">
                  {v.n === "EX1" || v.n === "EX2" || v.n === "EX3" ? "اختبار" : v.n === "LAB" ? "لاب" : v.n}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">{v.t}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {p.tag} — {p.cert}
                </span>
                <StatusBadge st={v.st} />
                <PriorityBadge p={v.p} />
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{v.r}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400">
            لا نتائج مطابقة — جرّب تغيير الفلاتر أو كلمة البحث
          </div>
        )}
      </div>
    </div>
  );
}
