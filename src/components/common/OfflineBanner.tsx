import { useState, useEffect } from "react";
import { WifiOff, CheckCircle2, RefreshCw } from "lucide-react";

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        setShowReconnected(true);
        const timer = setTimeout(() => {
          setShowReconnected(false);
        }, 4000);
        return () => clearTimeout(timer);
      };

      const handleOffline = () => {
        setIsOnline(false);
        setShowReconnected(false);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (isOnline && !showReconnected) {
    return null;
  }

  if (showReconnected) {
    return (
      <aside
        aria-label="Network status banner"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-xl border border-accent/40 bg-surface px-4 py-2.5 text-xs font-medium text-foreground shadow-lift animate-in fade-in slide-in-from-bottom-3 duration-300"
      >
        <CheckCircle2 className="h-4 w-4 text-accent" />
        <span>You're back online. Data synchronized.</span>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Network status banner"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl border border-destructive/30 bg-surface px-4 py-2.5 text-xs font-medium text-foreground shadow-lift animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex h-2 w-2 rounded-full bg-destructive animate-ping" />
      <WifiOff className="h-4 w-4 text-destructive" />
      <span>Internet connection lost. You are currently offline.</span>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="ml-1 inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-muted/80 cursor-pointer"
      >
        <RefreshCw className="h-3 w-3" />
        <span>Retry</span>
      </button>
    </aside>
  );
}
