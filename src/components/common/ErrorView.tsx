import { useState, useEffect, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Home,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { reportLovableError } from "@/lib/lovable-error-reporting";

interface ErrorViewProps {
  error: Error;
  reset?: () => void;
}

export function ErrorView({ error, reset }: ErrorViewProps) {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const handleRetry = useCallback(() => {
    setIsRetrying(true);
    setTimeout(() => {
      try {
        router.invalidate();
        if (reset) {
          reset();
        } else {
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
      setIsRetrying(false);
    }, 500);
  }, [reset, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        setJustReconnected(true);
        setTimeout(() => {
          handleRetry();
        }, 1200);
      };

      const handleOffline = () => {
        setIsOnline(false);
        setJustReconnected(false);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [handleRetry]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 selection:bg-accent selection:text-accent-contrast">
      <div className="w-full max-w-lg text-center">
        {/* Status icon based on connection state */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface shadow-soft">
            {!isOnline ? (
              <WifiOff className="h-10 w-10 text-destructive animate-pulse" />
            ) : justReconnected ? (
              <CheckCircle2 className="h-10 w-10 text-accent animate-bounce" />
            ) : (
              <AlertTriangle className="h-10 w-10 text-amber-500" />
            )}
          </div>
        </div>

        {/* Dynamic status pill */}
        {justReconnected ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-xs font-semibold text-accent-contrast">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span>Connection restored! Reloading...</span>
          </div>
        ) : !isOnline ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-medium text-destructive">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span>No internet connection detected</span>
          </div>
        ) : null}

        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {!isOnline ? "You're Currently Offline" : "Something Went Wrong Loading This Page"}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          {!isOnline
            ? "We can't reach the server right now. Please verify your Wi-Fi, Ethernet, or mobile data connection. The page will automatically refresh once you're back online."
            : "An unexpected error occurred while loading this view. You can retry loading or return to the homepage."}
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
            <span>{isRetrying ? "Reloading..." : "Try Again"}</span>
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/70 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </a>
        </div>

        {/* Diagnostics & Details */}
        {error?.message && (
          <div className="mt-10 rounded-2xl border border-border bg-surface/60 p-4 text-left shadow-soft">
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <span>Technical Diagnostics</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 overflow-x-auto rounded-lg border border-border/80 bg-background/80 p-3 font-mono text-[11px] text-muted-foreground">
                <p className="font-semibold text-destructive">
                  {error.name}: {error.message}
                </p>
                {error.stack && (
                  <pre className="mt-2 max-h-36 overflow-y-auto whitespace-pre-wrap text-[10px] text-muted-foreground/80">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
