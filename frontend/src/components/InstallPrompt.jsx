import { useEffect, useMemo, useState } from "react";

const DISMISS_KEY = "lumiya-install-dismissed";

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const isIos = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    const inStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    setIsStandalone(inStandaloneMode);
    if (inStandaloneMode) {
      return;
    }

    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    const handleInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      sessionStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    if (isIos && !dismissed) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, [isIos]);

  const dismissPrompt = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setShowPrompt(false);
  };

  const installApp = async () => {
    if (!deferredPrompt) {
      dismissPrompt();
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    if (choiceResult.outcome !== "accepted") {
      sessionStorage.setItem(DISMISS_KEY, "1");
    }
    setShowPrompt(false);
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-28 z-[70] sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm">
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold text-slate-900">Install Lumiya App</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">
          {deferredPrompt
            ? "Install for faster access and a full-screen app experience."
            : "On iPhone: tap Share, then choose Add to Home Screen."}
        </p>

        <div className="mt-3 flex items-center gap-2">
          {deferredPrompt && (
            <button
              type="button"
              onClick={installApp}
              className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Install App
            </button>
          )}
          <button
            type="button"
            onClick={dismissPrompt}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};
