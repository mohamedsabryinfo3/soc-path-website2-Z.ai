"use client";

import { useEffect, useState } from "react";

/**
 * كشف اكتمال التهيئة الأولية (Hydration) — ضروري لقراءة حالة التقدم
 * المحفوظة في localStorage عبر Zustand persist دون تعارض مع SSR.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  return mounted;
}
