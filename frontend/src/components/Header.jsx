import { useState, useEffect, useRef } from "react";
import {
  Bell,
  LayoutDashboard,
  ShoppingBag,
  CalendarClock,
  AlertTriangle,
  ArrowRight,
  Clock
} from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { getReturnReminders } from "../api/booking.api";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [reminders, setReminders] = useState([]);

  const mobileNotifRef = useRef(null);
  const desktopNotifRef = useRef(null);

  const handleBellClick = () => {
    const isDashboardRoute = location.pathname.startsWith("/dashboard");

    if (!isDashboardRoute) {
      setShowNotifications(false);
      navigate("/dashboard");
      return;
    }

    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    getReturnReminders(1)
      .then((data) => setReminders(data.results || []))
      .catch(() => setReminders([]));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const mobile = mobileNotifRef.current;
      const desktop = desktopNotifRef.current;

      if (
        (mobile && !mobile.contains(e.target)) &&
        (desktop && !desktop.contains(e.target))
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const navItemClass = ({ isActive }) =>
    `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition lg:h-auto lg:w-auto lg:rounded-none lg:hover:bg-transparent ${
      isActive
        ? "bg-pink-100 text-pink-700 lg:bg-transparent lg:text-pink-600"
        : "hover:bg-pink-50 hover:text-pink-600"
    }`;

  const NotificationDropdown = () => (
    <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-rose-100 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden z-50">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 border-b border-rose-100">
        <AlertTriangle size={14} className="text-rose-500" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-rose-900">
          Return Reminders
        </h3>

        {reminders.length > 0 && (
          <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {reminders.length}
          </span>
        )}
      </div>

      {/* Empty */}
      {reminders.length === 0 ? (
        <div className="p-6 text-center text-sm text-slate-400">
          <Clock size={24} className="mx-auto mb-2 text-slate-300" />
          No pending returns 🎉
        </div>
      ) : (
        <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
          {reminders.map((r) => (
            <Link
              key={r.id}
              to="/dashboard"
              onClick={() => setShowNotifications(false)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-rose-50/60 transition group"
            >
              <div className="mt-0.5 flex-none h-7 w-7 grid place-items-center rounded-lg bg-rose-100">
                <Clock size={13} className="text-rose-500" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {r.dress_name}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {r.customer_name}
                </p>
                <p className="text-[10px] font-semibold text-rose-500 mt-0.5">
                  Due: {r.end_date}
                </p>
              </div>

              <ArrowRight
                size={13}
                className="text-slate-300 group-hover:text-rose-400 mt-1 flex-none transition"
              />
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-100">
        <Link
          to="/dashboard"
          onClick={() => setShowNotifications(false)}
          className="flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-pink-500 transition"
        >
          Go to Dashboard <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );

  return (
    <header className="fixed inset-x-0 bottom-4 z-50 px-4 md:bottom-auto md:top-4 md:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/35 bg-white/20 backdrop-blur-xl md:border-gray-200 md:bg-white/95 md:shadow-lg">

        <div className="relative flex h-16 items-center justify-between">

          {/* LEFT */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-4 lg:px-6">

            <h1 className="flex-none text-base font-semibold tracking-wide text-gray-800 sm:text-xl">
              Lumiya
            </h1>

            <nav className="flex flex-1 items-center justify-evenly gap-1 text-xs font-medium text-gray-600 sm:gap-1.5 md:justify-center md:gap-2.5 lg:gap-6 lg:text-sm">

              <NavLink to="/" className={navItemClass}>
                <LayoutDashboard size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Home</span>
              </NavLink>

              <NavLink to="/dashboard" className={navItemClass}>
                <LayoutDashboard size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Dashboard</span>
              </NavLink>

              <NavLink to="/dashboard/dresses" className={navItemClass}>
                <ShoppingBag size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Products</span>
              </NavLink>

              <NavLink to="/dashboard/available-dresses" className={navItemClass}>
                <CalendarClock size={18} className="lg:hidden" />
                <span className="hidden lg:inline">Rentals</span>
              </NavLink>

              {/* MOBILE BELL */}
              <div ref={mobileNotifRef} className="relative md:hidden">
                <button
                onClick={handleBellClick}
                >
                  <Bell size={18} />

                  {reminders.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </button>

                {showNotifications && <NotificationDropdown />}
              </div>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3 px-4">

            <div ref={desktopNotifRef} className="relative">
              <button
                onClick={handleBellClick}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl hover:bg-rose-50"
              >
                <Bell size={20} />

                {reminders.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {reminders.length}
                  </span>
                )}
              </button>

              {showNotifications && <NotificationDropdown />}
            </div>

            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-pink-50"
            >
              <span className="text-sm font-medium text-gray-700">
                Admin
              </span>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};