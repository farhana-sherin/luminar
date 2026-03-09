import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Shirt, ShoppingCart, X } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18}/> },
    { name: "Dresses", path: "/dashboard/dresses", icon: <Shirt size={18}/> },
    { name: "Orders", path: "/dashboard/orders", icon: <ShoppingCart size={18}/> },
  ];

  return (
    <>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 
        bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 
        border-r border-gray-100 p-6 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Mobile Close */}
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h1 className="text-xl font-bold text-pink-600">Dress Admin</h1>
          <X onClick={() => setOpen(false)} className="cursor-pointer"/>
        </div>

        {/* Logo Desktop */}
        <h1 className="hidden md:block text-2xl font-bold mb-10 text-pink-600">
          Dress Admin
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">

          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition
                ${
                  active
                    ? "bg-white shadow text-pink-600"
                    : "text-gray-600 hover:bg-white hover:shadow"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 pt-10">
          © 2026 Dress Admin
        </div>

      </div>
    </>
  );
}