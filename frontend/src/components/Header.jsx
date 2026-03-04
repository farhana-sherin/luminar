import { Bell, Search, LayoutDashboard, ShoppingBag, CalendarClock } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 lg:top-4 lg:bottom-auto lg:px-8">
      <div className="relative max-w-7xl mx-auto rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg">
        
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6">

            {/* Logo */}
            <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
              Lumiya
            </h1>

            {/* Navigation */}
            <nav className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm font-medium text-gray-600">
              <a
                href="#"
                aria-label="Dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-auto sm:w-auto sm:rounded-none sm:hover:bg-transparent"
              >
                <LayoutDashboard size={18} className="sm:hidden" />
                <span className="hidden sm:inline">Dashboard</span>
              </a>
              <a
                href="#"
                aria-label="Products"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-auto sm:w-auto sm:rounded-none sm:hover:bg-transparent"
              >
                <ShoppingBag size={18} className="sm:hidden" />
                <span className="hidden sm:inline">Products</span>
              </a>
              <a
                href="#"
                aria-label="Rentals"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-pink-50 hover:text-pink-600 sm:h-auto sm:w-auto sm:rounded-none sm:hover:bg-transparent"
              >
                <CalendarClock size={18} className="sm:hidden" />
                <span className="hidden sm:inline">Rentals</span>
              </a>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4 px-4 lg:px-6">

            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
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
              <span className="hidden md:block text-sm font-medium text-gray-700">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
