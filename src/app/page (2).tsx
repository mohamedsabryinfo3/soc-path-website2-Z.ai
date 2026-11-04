"use client";

import { useSoc } from "@/lib/store";
import { Header, Footer } from "@/components/soc/shell";
import { HomeView } from "@/components/soc/home";
import { PathView } from "@/components/soc/path-view";
import { PrioritiesView } from "@/components/soc/priorities-view";
import { PlaylistsView } from "@/components/soc/playlists-view";
import { CompareView } from "@/components/soc/compare-view";
import { BeyondView } from "@/components/soc/beyond-view";

export default function Page() {
  const tab = useSoc((s) => s.tab);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {tab === "home" && <HomeView />}
        {tab === "path" && <PathView />}
        {tab === "priorities" && <PrioritiesView />}
        {tab === "playlists" && <PlaylistsView />}
        {tab === "compare" && <CompareView />}
        {tab === "beyond" && <BeyondView />}
      </main>
      <Footer />
    </div>
  );
}
