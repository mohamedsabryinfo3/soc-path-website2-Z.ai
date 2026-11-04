"use client";

import { cn } from "@/lib/utils";
import { priorityMeta, statusMeta, getPlaylist } from "@/data";
import type { Priority, VStatus } from "@/data/types";

export function PriorityBadge({ p, className }: { p: Priority; className?: string }) {
  const m = priorityMeta[p];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold whitespace-nowrap",
        m.cls,
        className
      )}
    >
      {m.label}
    </span>
  );
}

export function StatusBadge({ st, className }: { st?: VStatus; className?: string }) {
  if (!st) return null;
  const m = statusMeta[st];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        m.cls,
        className
      )}
    >
      {st === "selected" ? "✓ " : st === "alt" ? "★ " : "— "}
      {m.label}
    </span>
  );
}

export function PlChip({ plId, n, className }: { plId: string; n?: string; className?: string }) {
  const pl = getPlaylist(plId);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-600 whitespace-nowrap",
        className
      )}
    >
      <span
        className={cn(
          "rounded-sm px-1 py-px text-[10px] font-bold text-white",
          pl.tag === "عبير" ? "bg-blue-600" : "bg-slate-700"
        )}
      >
        {pl.tag}
      </span>
      <span className="font-mono">{pl.cert}</span>
      {n && <span className="rounded-sm bg-slate-100 px-1 font-mono text-[10px] text-slate-500">درس {n}</span>}
    </span>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h2>
      {sub && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base">{sub}</p>}
    </div>
  );
}
