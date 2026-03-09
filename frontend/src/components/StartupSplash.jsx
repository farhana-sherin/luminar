import { useEffect, useState } from "react";
import logoImage from "/images/logo.png"

const SPLASH_VISIBLE_MS = 1400;
const SPLASH_EXIT_MS = 700;

export const StartupSplash = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visibleDuration = prefersReducedMotion ? 400 : SPLASH_VISIBLE_MS;
    const exitDuration = prefersReducedMotion ? 0 : SPLASH_EXIT_MS;

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, visibleDuration);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, visibleDuration + exitDuration);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[#a0121a] transition-opacity duration-700 ease-out ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_45%)]" />
      <div
        className={`relative transition-all duration-700 ease-out ${
          isLeaving ? "translate-y-4 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        
        <img
          src={logoImage}
          alt="Lumia logo"
          className="h-auto w-56 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)] sm:w-64"
        />
      </div>
    </div>
  );
};
