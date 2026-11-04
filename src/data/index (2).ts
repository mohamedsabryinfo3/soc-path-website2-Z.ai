import type { Playlist, V, Priority } from "./types";
import { abeer125 } from "./playlists/abeer125";
import { nazmy125 } from "./playlists/nazmy125";
import { abeer301 } from "./playlists/abeer301";
import { abeerEncor } from "./playlists/abeerEncor";
import { nazmy301 } from "./playlists/nazmy301";

export const playlists: Playlist[] = [
  {
    id: "abeer301",
    name: "CCNA 200-301 — عبير حسني",
    instructor: "عبير حسني (Abeer Hosni)",
    tag: "عبير",
    cert: "CCNA 200-301",
    url: "https://www.youtube.com/playlist?list=PLped9VG7STA-5ku6JQRa3G48z7WvWtLV4",
    note: "العمود الفقري للمسار: أحدث الكورسات وأشملها أمنيًا — يضم سلسلة هجمات LAN الكاملة ودرس أساسيات الأمن السيبراني ودرس Encapsulation الفريد",
    videos: abeer301,
  },
  {
    id: "nazmy301",
    name: "CCNA 200-301 + ENCOR — أحمد نظمي",
    instructor: "أحمد نظمي (Ahmed Nazmy)",
    tag: "نظمي",
    cert: "CCNA 200-301 + ENCOR",
    url: "https://www.youtube.com/playlist?list=PL77yNtB4-LjnN2FU3h1v5hIJOHZfW9ugq",
    note: "سلاسل منهجية عميقة (DHCP، ACL، NAT، Switching، Routing) — مصدر الشروحات المختارة للتطبيقية + مرجع بديل شامل",
    videos: nazmy301,
  },
  {
    id: "nazmy125",
    name: "CCNA 200-125 — أحمد نظمي",
    instructor: "أحمد نظمي (Ahmed Nazmy)",
    tag: "نظمي",
    cert: "CCNA 200-125",
    url: "https://www.youtube.com/playlist?list=PL77yNtB4-LjlcazC5_mnwM1ClSmm9qp50",
    note: "كورس ذهبي للمراجعة العميقة: يضم درس DNS الوحيد بين القوائم، وSPAN+RSPAN، وشروحات STP وPort Security من الأعمق",
    videos: nazmy125,
  },
  {
    id: "abeer125",
    name: "CCNA 200-125 — عبير حسني",
    instructor: "عبير حسني (Abeer Hosni)",
    tag: "عبير",
    cert: "CCNA 200-125",
    url: "https://www.youtube.com/playlist?list=PLped9VG7STA-SnQv4X9lauBZGH4rW8ICF",
    note: "النسخة الأقدم من كورسات عبير؛ معظم مواضيعها تغطيها نسخة 200-301 الأحدث — يبقى مرجعًا احتياطيًا",
    videos: abeer125,
  },
  {
    id: "abeerEncor",
    name: "CCNP ENCOR 350-401 — عبير حسني",
    instructor: "عبير حسني (Abeer Hosni)",
    tag: "عبير",
    cert: "CCNP ENCOR 350-401",
    url: "https://www.youtube.com/playlist?list=PLped9VG7STA_ocn1WOs3eqt-TtxDbh7CP",
    note: "مستوى CCNP الاحترافي: مخزن تعمق لما بعد الاستقرار في دور SOC — لا يُفتح مبكرًا",
    videos: abeerEncor,
  },
];

export const priorityMeta: Record<Priority, { label: string; desc: string; cls: string; dot: string }> = {
  must: {
    label: "مهم",
    desc: "أساسي لمسار SOC — يدخل في الخطة التسلسلية أو بديلها المباشر",
    cls: "bg-blue-600 text-white border-blue-600",
    dot: "bg-blue-600",
  },
  medium: {
    label: "متوسط",
    desc: "مفيد للتعمق أو كمعرفة مساندة — بعد إتمام الأساسيات",
    cls: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
  },
  later: {
    label: "فيما بعد",
    desc: "قيمة حقيقية لكن تتأجل لما تستقر في الدور أو تتخصص",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  skip: {
    label: "غير مهم",
    desc: "بعيد عن مسار SOC — لا يستحق الوقت في هذه المرحلة",
    cls: "bg-slate-100 text-slate-500 border-slate-200",
    dot: "bg-slate-400",
  },
};

export const statusMeta: Record<string, { label: string; cls: string }> = {
  selected: { label: "مختار للمسار", cls: "bg-emerald-600 text-white border-emerald-600" },
  alt: { label: "مرجع بديل / مكمل", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  no: { label: "غير مختار", cls: "bg-slate-50 text-slate-400 border-slate-200" },
};

export function getPlaylist(id: string): Playlist {
  return playlists.find((p) => p.id === id)!;
}

export function findVideo(plId: string, n: string): { v: V; pl: Playlist } | undefined {
  const pl = playlists.find((p) => p.id === plId);
  if (!pl) return undefined;
  const v = pl.videos.find((x) => x.n === n);
  return v ? { v, pl } : undefined;
}

export const allVideos: { v: V; pl: Playlist }[] = playlists.flatMap((pl) =>
  pl.videos.map((v) => ({ v, pl }))
);

export const totalVideos = allVideos.length;

export const priorityCounts = {
  must: allVideos.filter((x) => x.v.p === "must").length,
  medium: allVideos.filter((x) => x.v.p === "medium").length,
  later: allVideos.filter((x) => x.v.p === "later").length,
  skip: allVideos.filter((x) => x.v.p === "skip").length,
};

export const selectedCount = allVideos.filter((x) => x.v.st === "selected").length;
export const altCount = allVideos.filter((x) => x.v.st === "alt").length;
export { playlists as default };
