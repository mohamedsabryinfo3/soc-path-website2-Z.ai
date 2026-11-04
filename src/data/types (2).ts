// أنواع البيانات الأساسية لمشروع مسار SOC
export type Priority = "must" | "medium" | "later" | "skip";
export type VStatus = "selected" | "alt" | "no";

export interface V {
  n: string; // رقم الدرس كما في القائمة الأصلية
  t: string; // عنوان الدرس كما هو
  p: Priority; // الأولوية لمسار SOC
  st?: VStatus; // علاقة الدرس بالمسار
  step?: number; // رقم خطوة المسار إن كان مختارًا
  r: string; // سبب التصنيف / الاختيار / الاستبعاد
}

export interface Playlist {
  id: string;
  name: string; // اسم القائمة
  instructor: string; // اسم المدرب كاملًا
  tag: string; // عبير / نظمي
  cert: string; // الشهادة
  url: string; // رابط القائمة على يوتيوب
  note: string; // وصف عام للقائمة ودورها في المسار
  videos: V[];
}

export interface PathStep {
  topic: string; // الموضوع بالعربية
  pl: string; // معرف القائمة
  n: string; // رقم الدرس
  why: string; // لماذا اختير هذا الشرح تحديدًا
  socWhy: string; // علاقته بمسار SOC
  backup?: { pl: string; n: string; note: string }; // مرجع بديل/مكمل
  optional?: boolean;
}

export interface Phase {
  num: number;
  title: string;
  goal: string;
  icon: string;
  steps: PathStep[];
}

export interface CompareOption {
  pl: string;
  n: string;
  verdict: "winner" | "complement" | "excluded";
  note: string;
}

export interface Comparison {
  topic: string;
  options: CompareOption[];
  decision: string;
}
