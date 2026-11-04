"use client";

import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  ClipboardList,
  GitCompareArrows,
  ListChecks,
  Play,
  Route,
  Scale,
  Search,
  TrendingUp,
  Youtube,
} from "lucide-react";
import { useSoc } from "@/lib/store";
import { useMounted } from "@/hooks/use-mounted";
import { phases, totalSteps } from "@/data/path";
import { playlists, priorityCounts, selectedCount, totalVideos, findVideo } from "@/data";
import { Progress, PlChip } from "./ui";
import { Button } from "@/components/ui/button";

export function HomeView() {
  const { setTab, done, jumpStep } = useSoc();
  const mounted = useMounted();

  const doneCount = mounted ? Object.values(done).filter(Boolean).length : 0;
  const pct = Math.round((doneCount / totalSteps) * 100);

  // أول خطوة غير مكتملة
  let next: { order: number; topic: string; pl: string; n: string } | null = null;
  if (mounted && doneCount > 0 && doneCount < totalSteps) {
    const flat = phases.flatMap((ph) => ph.steps);
    for (let i = 0; i < flat.length; i++) {
      if (!done[i + 1]) {
        next = { order: i + 1, topic: flat[i].topic, pl: flat[i].pl, n: flat[i].n };
        break;
      }
    }
  }

  const stats = [
    { icon: ClipboardList, val: String(totalVideos), label: "فيديو تم تحليله محتوى" },
    { icon: ListChecks, val: String(playlists.length), label: "قوائم كاملة مُراجعة" },
    { icon: Route, val: String(totalSteps), label: "درسًا مختارًا للمسار" },
    { icon: BookOpenCheck, val: "8", label: "مراحل متسلسلة حتى SOC" },
  ];

  const methodology = [
    {
      icon: Search,
      title: "تحليل المحتوى لا العنوان",
      desc: "كل درس فُحص على مستوى عمق الشرح والتطبيق العملي والأمثلة — لا الاسم فقط",
    },
    {
      icon: Scale,
      title: "الأفضل شرحًا يفوز",
      desc: "حين تتنافس قائمتان على نفس الموضوع، يُختار الأعمق تطبيقًا مع توثيق السبب",
    },
    {
      icon: GitCompareArrows,
      title: "لا تكرار بلا مكمل",
      desc: "درس ثانٍ يُضاف فقط إن قدّم جزءًا مكملًا واضحًا غير مكرر — وسيجدها موثقة",
    },
    {
      icon: TrendingUp,
      title: "القوائم مرجع بديل",
      desc: "كل القوائم محفوظة: عند الشرح الثاني لمفهوم لم تستوعبه، لكل درس بديل جاهز",
    },
  ];

  return (
    <div>
      {/* الهيرو */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-14 text-white sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold">
              <ShieldIcon />
              خطة مبنية على تحليل {totalVideos} فيديو
            </span>
            <h1 className="mt-4 text-3xl font-black leading-snug sm:text-5xl sm:leading-snug">
              من الشبكات إلى الأمن السيبراني
              <span className="mt-2 block text-lg font-bold text-blue-100 sm:text-2xl">
                مسار SOC تسلسلي مفلتر من قوائم عبير حسني وأحمد نظمي
              </span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-blue-50/90 sm:text-base">
              استُبعد كل ما هو بعيد عن مسار SOC، واختير أقوى شرح لكل موضوع بمقارنة محتوى الدروس
              وليس عناوينها — مع ذكر سبب كل اختيار وكل استبعاد.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white font-bold text-blue-700 hover:bg-blue-50"
                onClick={() => setTab("path")}
              >
                <Play className="ml-1 h-4 w-4" />
                {doneCount > 0 ? "كمّل مسارك" : "ابدأ المسار الآن"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white"
                onClick={() => setTab("priorities")}
              >
                استعرض تصنيف الفيديوهات
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* الإحصائيات */}
        <section className="-mt-8 relative z-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <s.icon className="mx-auto h-5 w-5 text-blue-600" />
                <div className="mt-2 text-2xl font-black text-slate-900 font-mono" dir="ltr">
                  {s.val}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* كمّل من حيث وقفت */}
        {next && (
          <section className="mt-8">
            <div className="flex flex-col gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-bold text-blue-700">
                  كمّل من حيث وقفت — الخطوة {next.order} من {totalSteps}
                </div>
                <div className="mt-1 text-lg font-extrabold text-slate-900">{next.topic}</div>
                <div className="mt-2">
                  <PlChip plId={next.pl} n={next.n} />
                </div>
              </div>
              <Button
                className="shrink-0"
                onClick={() => {
                  jumpStep(next.order);
                  setTab("path");
                }}
              >
                انتقل للدرس
              </Button>
            </div>
          </section>
        )}

        {/* التقدم */}
        {mounted && doneCount > 0 && (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">إنجازك في المسار</span>
              <span className="font-mono text-xs text-slate-400" dir="ltr">
                {doneCount}/{totalSteps} — {pct}%
              </span>
            </div>
            <Progress value={pct} />
          </section>
        )}

        {/* المنهجية */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-900">كيف بنيت الخطة؟</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
            المنهجية المتبعة في فلترة القوائم الخمس — حتى تعرف أن كل درس في المسار وصل لسبب.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {methodology.map((m) => (
              <div key={m.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <m.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* معاينة المراحل */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-900">مراحل المسار الثماني</h2>
          <p className="mt-2 text-sm text-slate-500">
            ترتيب تسلسلي محسوب: كل مرحلة تبني على ما قبلها — من فهم الترافيك حتى يوم محلل SOC الفعلي.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((ph) => (
              <button
                key={ph.num}
                onClick={() => setTab("path")}
                className="group rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-mono text-xs font-bold text-white">
                    {ph.num}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700">
                    {ph.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  {ph.steps.length} درسًا مختارًا
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* توزيع الأولويات */}
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-900">توزيع الأولويات على {totalVideos} فيديو</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "must", label: "مهم", v: priorityCounts.must, cls: "bg-blue-600 text-white" },
              { k: "medium", label: "متوسط", v: priorityCounts.medium, cls: "bg-sky-50 text-sky-700 border border-sky-200" },
              { k: "later", label: "فيما بعد", v: priorityCounts.later, cls: "bg-amber-50 text-amber-700 border border-amber-200" },
              { k: "skip", label: "غير مهم", v: priorityCounts.skip, cls: "bg-slate-100 text-slate-500 border border-slate-200" },
            ].map((x) => (
              <button
                key={x.k}
                onClick={() => setTab("priorities")}
                className={`rounded-xl p-4 text-center transition-transform hover:scale-[1.02] ${x.cls}`}
              >
                <div className="text-2xl font-black font-mono" dir="ltr">{x.v}</div>
                <div className="mt-1 text-xs font-bold">{x.label}</div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            منها {selectedCount} درسًا مختارًا مباشرة في المسار التسلسلي، والبقية مراجع بديلة أو مؤجلة أو مستبعدة بأسباب موثقة.
          </p>
        </section>

        {/* القوائم */}
        <section className="mt-12 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">القوائم الخمس المصدر</h2>
            <button onClick={() => setTab("playlists")} className="text-sm font-bold text-blue-600 hover:underline">
              تفاصيل القوائم ←
            </button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.map((pl) => (
              <div key={pl.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-slate-900 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    {pl.cert}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{pl.tag}</span>
                </div>
                <h3 className="mt-3 text-sm font-extrabold text-slate-900">{pl.instructor}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">{pl.note}</p>
                <a
                  href={pl.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline"
                >
                  <Youtube className="h-4 w-4" />
                  القائمة على يوتيوب
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
