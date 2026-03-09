import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/SiderBar";

export default function DashboardLayout() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen">


      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        {/* Top bar (mobile) */}
        <div className="md:hidden flex items-center gap-4 p-4 bg-white shadow-sm">
          <Menu
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          />
          <h1 className="font-semibold">Dashboard</h1>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
}