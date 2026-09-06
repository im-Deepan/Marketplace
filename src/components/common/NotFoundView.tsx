import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  Home,
  RefreshCw,
  WifiOff,
  ArrowLeft,
  Layers,
  Lightbulb,
  Users,
} from "lucide-react";

export function NotFoundView() {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const handleCheckConnection = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
      setIsChecking(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 selection:bg-accent selection:text-accent-contrast">
      <div className="w-full max-w-xl text-center">
        {/* Connection status indicator if offline */}
        {!isOnline && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5 text-xs font-medium text-destructive">
            <WifiOff className="h-3.5 w-3.5 animate-pulse" />
            <span>Internet connection lost</span>
          </div>
        )}

        {/* 404 Display */}
        <div className="relative mb-6">
          <div className="font-display text-8xl font-extrabold tracking-tighter text-foreground/20 sm:text-9xl">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-soft">
              <Compass className="h-8 w-8 text-accent" />
            </div>
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {!isOnline ? "Unable to Load Page — You're Offline" : "Page Not Found"}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          {!isOnline
            ? "Your device has disconnected from the internet. Please check your network connection and try again."
            : "The page or project you are looking for doesn't exist, has been moved, or an unexpected routing issue occurred."}
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>

          <button
            type="button"
            onClick={handleCheckConnection}
            disabled={isChecking}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Checking..." : "Retry Page"}</span>
          </button>
        </div>

        {/* Suggested Quick Destinations */}
        <div className="mt-12 rounded-2xl border border-border bg-surface/50 p-6 text-left shadow-soft">
          <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore ProjectHub
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="/#projects"
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-muted/40"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Layers className="h-4 w-4" />
              </div>
              <span>Browse Projects</span>
            </a>

            <a
              href="/#ideas"
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-muted/40"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Lightbulb className="h-4 w-4" />
              </div>
              <span>Explore Ideas</span>
            </a>

            <a
              href="/#builders"
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface p-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-muted/40"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Users className="h-4 w-4" />
              </div>
              <span>Find Builders</span>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="javascript:history.back()"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go back to previous page</span>
          </a>
        </div>
      </div>
    </div>
  );
}
