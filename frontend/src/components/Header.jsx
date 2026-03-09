import { useState } from "react";
import { Bell, Search, LayoutDashboard, ShoppingBag, CalendarClock } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navItemClass = ({ isActive }) =>
    `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition lg:h-auto lg:w-auto lg:rounded-none lg:hover:bg-transparent ${
      isActive
        ? "bg-pink-100 text-pink-700 lg:bg-transparent lg:text-pink-600"
        : "hover:bg-pink-50 hover:text-pink-600"
    }`;

  return (
    <>
      <Link
        to="/dashboard"
        aria-label="Open admin dashboard"
        className="fixed top-4 right-4 z-60 md:hidden rounded-full border border-gray-200 bg-white p-1.5 shadow-md"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="h-8 w-8 rounded-full object-cover"
        />
      </Link>

      <header className="fixed inset-x-0 bottom-4 z-50 px-4 md:bottom-auto md:top-4 md:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/35 bg-white/20 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.55)] backdrop-blur-xl md:border-gray-200 md:bg-white/95 md:shadow-lg">
          <div className="pointer-events-none absolute inset-0 md:hidden">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0.2)_42%,rgba(255,255,255,0.08)_100%)]" />
            <div className="absolute -left-8 top-0 h-12 w-40 rotate-6 bg-white/30 blur-xl" />
          </div>

          <div className="relative flex h-16 items-center justify-between">
            {/* Left Section */}
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-4 lg:px-6">

            {/* Logo */}
              <h1 className="flex-none text-base font-semibold leading-none tracking-wide text-gray-800 sm:text-xl">
                Lumiya
              </h1>

            {/* Navigation */}
              <nav className="flex flex-1 items-center justify-evenly gap-1 text-xs font-medium text-gray-600 sm:gap-1.5 md:justify-center md:gap-2.5 lg:gap-6 lg:text-sm">
              <NavLink
                to="/dashboard"
                aria-label="Dashboard"
                className={navItemClass}
              >
                <LayoutDashboard size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Dashboard</span>
              </NavLink>
              <NavLink
                to="/dashboard/products/add"
                aria-label="Products"
                className={navItemClass}
              >
                <ShoppingBag size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Products</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                aria-label="Rentals"
                className={navItemClass}
              >
                <CalendarClock size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Rentals</span>
              </NavLink>
              <button
                type="button"
                aria-label="Search"
                onClick={() => setShowMobileSearch((prev) => !prev)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 md:hidden"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 md:hidden"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-pink-500" />
              </button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="hidden flex-none md:flex items-center gap-2.5 lg:gap-4 px-4 lg:px-6">

            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-pink-50 hover:text-pink-600 lg:hidden"
            >
              <Search size={18} />
            </button>

            {/* Search */}
            <div className="hidden lg:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="bg-transparent outline-none px-2 text-sm"
              />
            </div>

            {/* Notification */}
            <button className="relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                3
              </span>
            </button>

            {/* Profile */}
            <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer rounded-lg px-1 py-1 hover:bg-pink-50">
              <img
                src="https://i.pravatar.cc/40"
                alt="admin"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="hidden xl:block text-sm font-medium text-gray-700">
                Admin
              </span>
            </Link>
          </div>
        </div>

        {showMobileSearch && (
          <div className="absolute bottom-full left-0 right-0 mb-3 px-3 md:hidden">
            <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full bg-transparent px-2 text-sm outline-none"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
      </header>
    </>
  );
};
