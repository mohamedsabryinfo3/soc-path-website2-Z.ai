"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { playlists, getPlaylist } from "@/data";
import { PriorityBadge, StatusBadge, SectionTitle } from "./ui";
import { Button } from "@/components/ui/button";

export function PlaylistsView() {
  const [openId, setOpenId] = useState<string | null>(null);

  if (openId) {
    return <PlaylistDetail id={openId} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="القوائم الخمس — المرجع الكامل"
        sub="لكل قائمة: كل الدروس، وما اختير منها للمسار، وما بقي مرجعًا بديلًا، وما استُبعد وسببه. القوائم نفسها تحتفظ بها كمرجع دائم لأي شرح ثانٍ تحتاجه."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {playlists.map((pl) => {
          const sel = pl.videos.filter((v) => v.st === "selected").length;
          const alt = pl.videos.filter((v) => v.st === "alt").length;
          const rest = pl.videos.length - sel - alt;
          return (
            <div key={pl.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-white">
                  {pl.cert}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${pl.tag === "عبير" ? "bg-blue-600 text-white" : "bg-slate-700 text-white"}`}>
                  {pl.instructor}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{pl.note}</p>

              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {[
                  { v: pl.videos.length, l: "درسًا", c: "text-slate-700" },
                  { v: sel, l: "مختار", c: "text-emerald-600" },
                  { v: alt, l: "بديل", c: "text-blue-600" },
                  { v: rest, l: "مؤجل/مستبعد", c: "text-slate-400" },
                ].map((x, i) => (
                  <div key={i} className="rounded-lg bg-slate-50 py-2">
                    <div className={`text-lg font-black font-mono ${x.c}`} dir="ltr">{x.v}</div>
                    <div className="text-[10px] font-bold text-slate-400">{x.l}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Button className="flex-1" onClick={() => setOpenId(pl.id)}>
                  عرض القائمة كاملة
                </Button>
                <a href={pl.url} target="_blank" rel="noreferrer" aria-label="فتح على يوتيوب">
                  <Button variant="outline" size="icon" className="text-red-600">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlaylistDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const pl = getPlaylist(id);
  const [filter, setFilter] = useState<"all" | "selected" | "alt" | "no">("all");

  const shown = pl.videos.filter((v) => {
    if (filter === "all") return true;
    if (filter === "no") return !v.st || v.st === "no";
    return v.st === filter;
  });

  const sel = pl.videos.filter((v) => v.st === "selected").length;
  const alt = pl.videos.filter((v) => v.st === "alt").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Button variant="ghost" onClick={onBack} className="mb-4 text-slate-500">
        <ArrowRight className="ml-1 h-4 w-4" />
        كل القوائم
      </Button>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              {pl.cert} — {pl.instructor}
            </h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">{pl.note}</p>
          </div>
          <a href={pl.url} target="_blank" rel="noreferrer">
            <Button variant="outline" className="text-red-600">
              <ExternalLink className="ml-1 h-4 w-4" />
              القائمة على يوتيوب
            </Button>
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { k: "all", l: `الكل (${pl.videos.length})` },
            { k: "selected", l: `مختار للمسار (${sel})` },
            { k: "alt", l: `مرجع بديل / مكمل (${alt})` },
            { k: "no", l: `غير مختار (${pl.videos.length - sel - alt})` },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() => setFilter(b.k as typeof filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                filter === b.k
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        {shown.map((v, i) => (
          <div
            key={`${v.n}-${i}`}
            className={`rounded-xl border p-4 shadow-sm ${
              v.st === "selected"
                ? "border-emerald-200 bg-emerald-50/40"
                : v.st === "alt"
                ? "border-blue-100 bg-blue-50/30"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="w-10 shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-center font-mono text-xs font-bold text-slate-500">
                  {v.n}
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">{v.t}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusBadge st={v.st} />
                <PriorityBadge p={v.p} />
              </div>
            </div>
            <p className="mt-2 pr-12 text-xs leading-relaxed text-slate-500">{v.r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
