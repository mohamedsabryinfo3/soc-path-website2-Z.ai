"use client";

import { useEffect, useMemo, useRef } from "react";
import { Check, CircleAlert, Flag, Link2, MapPin, RotateCcw, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoc } from "@/lib/store";
import { useMounted } from "@/hooks/use-mounted";
import { phases, totalSteps } from "@/data/path";
import { findVideo } from "@/data";
import type { PathStep } from "@/data/types";
import { Progress, SectionTitle } from "./ui";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface FlatStep {
  order: number;
  phaseNum: number;
  step: PathStep;
}

const phaseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Network: MapPin,
  Terminal: Flag,
  Server: Flag,
  Route: Link2,
  Shield: Star,
  Lock: Star,
  Radar: Flag,
  Cloud: Star,
};

export function PathView() {
  const { done, toggleDone, resetProgress, jumpStep, setJumpStep } = useSoc();
  const mounted = useMounted();
  const stepRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // التجميع المسبق: رقم تسلسلي ثابت لكل خطوة (يُحسب مرة واحدة)
  const flat = useMemo<FlatStep[]>(() => {
    const arr: FlatStep[] = [];
    phases.forEach((ph) => {
      ph.steps.forEach((step) => {
        arr.push({ order: arr.length + 1, phaseNum: ph.num, step });
      });
    });
    return arr;
  }, []);

  // الانتقال للخطوة المطلوبة
  useEffect(() => {
    if (mounted && jumpStep) {
      const el = stepRefs.current[jumpStep];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      setJumpStep(null);
    }
  }, [mounted, jumpStep, setJumpStep]);

  const doneCount = mounted ? Object.values(done).filter(Boolean).length : 0;
  const pct = Math.round((doneCount / totalSteps) * 100);

  const firstIncomplete = flat.find((f) => !done[f.order]) ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="المسار التسلسلي لبناء SOC"
        sub="كل درس اختير بمقارنة المحتوى وليس العنوان. علم على الدرس بعد مشاهدته — تقدمك يُحفظ تلقائيًا في متصفحك."
      />

      {/* شريط الإنجاز العام */}
      <div className="sticky top-[6.6rem] z-30 mb-8 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="font-bold text-slate-700">
            إنجازك:{" "}
            <span className="font-mono text-blue-700" dir="ltr">
              {doneCount}/{totalSteps}
            </span>
          </span>
          <div className="flex items-center gap-2">
            {firstIncomplete && doneCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => {
                  const el = stepRefs.current[firstIncomplete.order];
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <MapPin className="ml-1 h-3.5 w-3.5" />
                كمّل: {firstIncomplete.step.topic}
              </Button>
            )}
            {doneCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs text-slate-400 hover:text-red-600"
                onClick={() => {
                  resetProgress();
                  toast({ title: "تم تصفير التقدم", description: "بالتوفيق من جديد في المسار!" });
                }}
              >
                <RotateCcw className="ml-1 h-3.5 w-3.5" />
                تصفير
              </Button>
            )}
          </div>
        </div>
        <Progress value={pct} />
      </div>

      {/* المراحل */}
      <div className="space-y-12">
        {phases.map((ph) => {
          const PhaseIcon = phaseIcons[ph.icon] ?? Flag;
          const phaseSteps = flat.filter((f) => f.phaseNum === ph.num);
          const phaseDone = phaseSteps.filter((f) => done[f.order]).length;
          return (
            <section key={ph.num}>
              <div className="mb-5 flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-l from-blue-50 to-white p-5 sm:flex-row sm:items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-mono text-lg font-black text-white shadow">
                  {ph.num}
                </span>
                <div className="flex-1">
                  <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                    <PhaseIcon className="h-5 w-5 text-blue-600" />
                    {ph.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{ph.goal}</p>
                </div>
                <div className="shrink-0 text-left">
                  <div className="font-mono text-xs text-slate-400" dir="ltr">
                    {phaseDone}/{ph.steps.length}
                  </div>
                  <Progress value={(phaseDone / ph.steps.length) * 100} className="mt-1 w-24" />
                </div>
              </div>

              <div className="space-y-3">
                {phaseSteps.map(({ order, step }) => {
                  const isDone = mounted && !!done[order];
                  const found = findVideo(step.pl, step.n);
                  const backup = step.backup ? findVideo(step.backup.pl, step.backup.n) : undefined;
                  return (
                    <div
                      key={order}
                      ref={(el) => {
                        stepRefs.current[order] = el;
                      }}
                      className={cn(
                        "rounded-xl border bg-white p-4 shadow-sm transition-all sm:p-5",
                        isDone ? "border-emerald-200 bg-emerald-50/40" : "border-slate-200",
                        step.optional && "border-dashed"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleDone(order)}
                          aria-label={isDone ? `إلغاء إنجاز: ${step.topic}` : `تحديد كمشاهد: ${step.topic}`}
                          className={cn(
                            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all",
                            isDone
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-300 bg-white text-slate-500 hover:border-blue-400 hover:text-blue-600"
                          )}
                        >
                          {isDone ? <Check className="h-5 w-5" /> : order}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={cn(
                                "font-extrabold text-slate-900",
                                isDone && "text-emerald-800"
                              )}
                            >
                              {step.topic}
                            </h3>
                            {step.optional && (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                                اختياري
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-800">
                              📺 {found?.pl.instructor} — {found?.pl.cert} — درس {step.n}
                            </span>
                            {found && (
                              <a
                                href={found.pl.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50"
                              >
                                فتح القائمة
                              </a>
                            )}
                          </div>

                          <div className="mt-3 grid gap-2.5 text-sm">
                            <p className="leading-relaxed text-slate-600">
                              <span className="font-bold text-slate-800">لماذا هذا الشرح؟ </span>
                              {step.why}
                            </p>
                            <p className="rounded-lg bg-blue-50/70 p-2.5 leading-relaxed text-blue-900">
                              <span className="font-bold">🔗 علاقته بـ SOC: </span>
                              {step.socWhy}
                            </p>
                            {backup && step.backup && (
                              <p className="flex items-start gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2.5 leading-relaxed text-slate-600">
                                <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                                <span>
                                  <span className="font-bold text-slate-800">مرجع بديل: </span>
                                  {backup.pl.instructor} — {backup.pl.cert} — درس {step.backup.n}:{" "}
                                  {step.backup.note}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* خاتمة المسار */}
      <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
        <CircleAlert className="mx-auto h-8 w-8 text-blue-600" />
        <h3 className="mt-3 text-lg font-extrabold text-slate-900">خلصت الدروس الـ {totalSteps}؟ مبروك 🎯</h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          أنت الآن جاهز للانتقال إلى قسم <b>ما بعد الكورسات</b>: Wireshark وSIEM ومسار SOC Level 1
          على TryHackMe — وهناك يبدأ الشغل الحقيقي بمهارات تُطبق مباشرة في الوظيفة.
        </p>
      </div>
    </div>
  );
}
