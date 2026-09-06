import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import { navLinks } from "@/data/homeData";
import { ThemeToggle } from "./theme";
import { ActionButton } from "./primitives";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { UserMenu, MobileDrawerUserProfile } from "@/components/auth/UserMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, openSignIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-5"
      >
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Trigger (Left Side) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu drawer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface cursor-pointer lg:hidden hover:border-accent transition-colors"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            </SheetTrigger>

            {/* Drawer from the Left Side */}
            <SheetContent side="left" className="flex w-[290px] sm:w-[320px] flex-col p-6">
              <SheetHeader className="text-left pb-4 border-b border-border">
                <SheetTitle className="font-display text-xl font-bold tracking-tight">
                  Project<span className="text-accent">Hub</span>
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Discover, build, and collaborate on real projects.
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-1 flex-col justify-between py-6">
                <ul className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group relative flex items-center rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted/70 hover:text-accent transition-colors"
                      >
                        <span>{link.label}</span>
                        <span
                          className="absolute bottom-1.5 left-3 h-[2px] w-0 rounded-full bg-accent transition-all duration-300 ease-out group-hover:w-[calc(100%-1.5rem)]"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-border">
                  {isAuthenticated ? (
                    <MobileDrawerUserProfile />
                  ) : (
                    <ActionButton
                      onClick={() => {
                        setOpen(false);
                        openSignIn();
                      }}
                      className="w-full justify-center"
                    >
                      Sign In
                    </ActionButton>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            Project<span className="text-accent">Hub</span>
          </a>
        </div>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative inline-flex items-center py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{link.label}</span>
                {/* Progressive accent color expanding underline bar on hover */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-accent transition-all duration-300 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="#projects"
            aria-label="Search the platform"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent lg:inline-flex"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </a>
          <ThemeToggle />

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              {/* Mobile Sign In Button without icon */}
              <button
                type="button"
                onClick={openSignIn}
                className="inline-flex items-center justify-center rounded-xl bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-contrast shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer lg:hidden"
              >
                Sign In
              </button>

              {/* Desktop Sign In Button */}
              <ActionButton onClick={openSignIn} className="hidden px-4 py-2 lg:inline-flex">
                Sign In
              </ActionButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
