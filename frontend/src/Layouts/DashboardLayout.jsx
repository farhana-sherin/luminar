import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--page-start)_0%,var(--page-mid)_50%,var(--page-end)_100%)]">
      <main className="py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-6">

          <div className="flex gap-6 items-start">

            {/* Sidebar */}
            <div className="w-[240px] shrink-0">
              <Sidebar />
            </div>

            {/* Page Content */}
            <div className="flex-1 min-w-0">
              <Outlet />
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};