import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { navLinks } from "@/data/homeData";
import { ThemeToggle } from "./theme";
import { ActionButton } from "./primitives";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5"
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Project<span className="text-accent">Hub</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#projects"
            aria-label="Search the platform"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent lg:inline-flex"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <ActionButton className="hidden px-4 py-2 lg:inline-flex">Sign In</ActionButton>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-3 text-sm last:border-0"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <ActionButton className="w-full">Sign In</ActionButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
