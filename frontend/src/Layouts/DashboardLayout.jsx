import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/dashboard/SiderBar";

export default function DashboardLayout() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen">


      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        {/* Top bar (mobile) */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-[100] flex items-center gap-4 p-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <h1 className="font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex-1 p-6 mt-16 md:mt-0">
          <Outlet />
        </div>

      </div>

    </div>
  );
}