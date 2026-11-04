"use client";

import { CheckCircle2, MinusCircle, PlusCircle, Scale } from "lucide-react";
import { comparisons } from "@/data/comparisons";
import { findVideo } from "@/data";
import { SectionTitle } from "./ui";

const verdictMeta = {
  winner: { label: "الأفضل شرحًا", cls: "bg-emerald-600 text-white", icon: CheckCircle2 },
  complement: { label: "مكمل مختار", cls: "bg-blue-600 text-white", icon: PlusCircle },
  excluded: { label: "مستبعد", cls: "bg-slate-100 text-slate-400", icon: MinusCircle },
};

export function CompareView() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="المقارنات — لماذا فاز هذا الدرس؟"
        sub="لكل موضوع متكرر بين القوائم: مقارنة على مستوى المحتوى (عمق الشرح، التطبيق العملي، الأمثلة)، والقرار النهائي الموثق. درس ثانٍ يُضاف فقط إن كان مكملًا غير مكرر."
      />
      <div className="space-y-5">
        {comparisons.map((c) => (
          <div key={c.topic} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Scale className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">{c.topic}</h3>
            </div>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {c.options.map((o, i) => {
                const found = findVideo(o.pl, o.n);
                const vm = verdictMeta[o.verdict];
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${
                      o.verdict === "winner"
                        ? "border-emerald-200 bg-emerald-50/50"
                        : o.verdict === "complement"
                        ? "border-blue-100 bg-blue-50/50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <span className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${vm.cls}`}>
                      <vm.icon className="h-3 w-3" />
                      {vm.label}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-800">
                        {found?.pl.instructor} — <span className="font-mono">{found?.pl.cert}</span> — درس {o.n}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{o.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg border-r-4 border-blue-600 bg-blue-50 p-3 text-sm font-semibold leading-relaxed text-blue-900">
              {c.decision}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
