import { useState } from "react";
import { Bell, Search, LayoutDashboard, ShoppingBag, CalendarClock } from "lucide-react";

export const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Profile"
        className="fixed top-4 right-4 z-[60] md:hidden rounded-full border border-gray-200 bg-white p-1.5 shadow-md"
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="h-8 w-8 rounded-full object-cover"
        />
      </button>

      <header className="fixed inset-x-0 bottom-4 z-50 px-4 md:bottom-auto md:top-4 md:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg">
        
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6">

            {/* Logo */}
            <h1 className="text-base font-semibold text-gray-800 tracking-wide sm:text-xl">
              Lumiya
            </h1>

            {/* Navigation */}
            <nav className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-6 text-xs lg:text-sm font-medium text-gray-600">
              <a
                href="#"
                aria-label="Dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-10 sm:w-10 lg:h-auto lg:w-auto lg:rounded-none lg:hover:bg-transparent"
              >
                <LayoutDashboard size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Dashboard</span>
              </a>
              <a
                href="#"
                aria-label="Products"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-10 sm:w-10 lg:h-auto lg:w-auto lg:rounded-none lg:hover:bg-transparent"
              >
                <ShoppingBag size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Products</span>
              </a>
              <a
                href="#"
                aria-label="Rentals"
                className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-10 sm:w-10 lg:h-auto lg:w-auto lg:rounded-none lg:hover:bg-transparent"
              >
                <CalendarClock size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Rentals</span>
              </a>
              <button
                type="button"
                aria-label="Search"
                onClick={() => setShowMobileSearch((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 md:hidden"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 md:hidden"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-pink-500" />
              </button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-4 px-4 lg:px-6">

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
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="admin"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="hidden xl:block text-sm font-medium text-gray-700">
                Admin
              </span>
            </div>
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
