import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "مسار SOC | من الشبكات إلى الأمن السيبراني",
  description:
    "خطة تفاعلية لبناء مسار الأمن السيبراني وبداية SOC من 5 قوائم فيديوهات شبكات (عبير حسني وأحمد نظمي): تصنيف بالأولويات، مقارنة أفضل الشروحات، ومسار تسلسلي كامل",
  keywords: ["SOC", "الأمن السيبراني", "CCNA", "مسار تعليمي", "Blue Team", "SIEM"],
  authors: [{ name: "SOC Path Planner" }],
  openGraph: {
    title: "مسار SOC — من الشبكات إلى الأمن السيبراني",
    description: "306 فيديو محللة و51 درسًا مختارًا في مسار تسلسلي واحد",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
