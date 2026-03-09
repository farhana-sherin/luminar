import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { StartupSplash } from "../components/StartupSplash";


export const MainLayout = () => {
  const [showStartupSplash, setShowStartupSplash] = useState(true);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--page-start)_0%,var(--page-mid)_50%,var(--page-end)_100%)]">
      <Header />
      <main className="pt-24 pb-28 md:pt-28 md:pb-10">
        <Outlet />
      </main>
      <Footer />
      {showStartupSplash && (
        <StartupSplash onComplete={() => setShowStartupSplash(false)} />
      )}
    </div>
  )
}
