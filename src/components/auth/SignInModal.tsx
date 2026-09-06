import { useState } from "react";
import { useAuth, DEMO_USERS, User } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Mail, User as UserIcon } from "lucide-react";

export function SignInModal() {
  const { isSignInOpen, closeSignIn, signIn } = useAuth();
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<User>(DEMO_USERS[0]);
  const [mode, setMode] = useState<"quick" | "custom">("quick");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    signIn({
      name: customName.trim(),
      email: customEmail.trim() || `${customName.toLowerCase().replace(/\s+/g, ".")}@builder.dev`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: "Hardware & Software Creator",
      reputation: 500,
      projectsCount: 1,
    });
    setCustomName("");
    setCustomEmail("");
  };

  const handleQuickSignIn = (user: User) => {
    signIn(user);
  };

  return (
    <Dialog open={isSignInOpen} onOpenChange={(open) => !open && closeSignIn()}>
      <DialogContent className="max-w-md border-border bg-surface p-0 overflow-hidden sm:rounded-2xl shadow-lift">
        {/* Header decoration */}
        <div className="bg-gradient-to-br from-accent/20 via-surface to-surface p-6 pb-4 border-b border-border/80">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-contrast mb-3">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Welcome to ProjectHub</span>
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-2xl font-bold tracking-tight text-foreground">
              Sign In to Your Account
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              Connect with fellow builders, showcase your hardware & software projects, and bookmark
              ideas.
            </DialogDescription>
          </DialogHeader>

          {/* Mode Switcher */}
          <div className="mt-4 flex rounded-xl border border-border bg-background/80 p-1">
            <button
              type="button"
              onClick={() => setMode("quick")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                mode === "quick"
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              1-Click Demo Profiles
            </button>
            <button
              type="button"
              onClick={() => setMode("custom")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                mode === "custom"
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Custom Profile
            </button>
          </div>
        </div>

        <div className="p-6">
          {mode === "quick" ? (
            <div className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
                Select a verified builder persona to test the platform:
              </p>
              <div className="space-y-2">
                {DEMO_USERS.map((demo) => {
                  const isSelected = selectedDemo.id === demo.id;
                  return (
                    <div
                      key={demo.id}
                      onClick={() => setSelectedDemo(demo)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedDemo(demo)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-accent bg-accent/5 ring-1 ring-accent"
                          : "border-border bg-background/50 hover:border-border/80 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={demo.avatar} alt={demo.name} />
                          <AvatarFallback>{demo.initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-foreground">
                              {demo.name}
                            </span>
                            <span className="text-[10px] rounded bg-accent/20 px-1.5 py-0.2 text-accent-contrast font-medium">
                              {demo.reputation} pts
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{demo.role}</p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-contrast">
                          <UserCheck className="h-3 w-3" />
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Select</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handleQuickSignIn(selectedDemo)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast shadow-soft transition-transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <span>Continue as {selectedDemo.name}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="custom-name"
                  className="block text-xs font-semibold text-foreground mb-1.5"
                >
                  Full Name or Maker Handle
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="custom-name"
                    type="text"
                    required
                    placeholder="e.g. Deepan Kumar"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="custom-email"
                  className="block text-xs font-semibold text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="custom-email"
                    type="email"
                    placeholder="e.g. deepan@maker.dev"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Instant profile initialization with local synchronization.</span>
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast shadow-soft transition-transform hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <span>Create & Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
