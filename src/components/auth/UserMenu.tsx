import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, FolderGit2, Bookmark, Sparkles, ChevronDown, Award } from "lucide-react";

interface UserMenuProps {
  className?: string;
  showName?: boolean;
}

export function UserMenu({ className, showName = true }: UserMenuProps) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Open user menu for ${user.name}`}
          className={`group flex items-center gap-2 rounded-full border border-border bg-surface p-1 pr-2 transition-all hover:border-accent/80 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${className || ""}`}
        >
          <div className="relative">
            <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-[11px] font-bold bg-accent/20 text-accent-contrast">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-surface" />
          </div>

          {showName && (
            <div className="hidden text-left lg:block max-w-[120px]">
              <p className="truncate text-xs font-semibold text-foreground leading-tight">
                {user.name}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">{user.reputation} pts</p>
            </div>
          )}

          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-2xl border-border bg-surface p-1.5 shadow-lift z-50"
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-foreground leading-none">{user.name}</p>
              <span className="inline-flex items-center gap-0.5 rounded bg-accent/20 px-1 py-0.2 text-[10px] font-bold text-accent-contrast">
                <Sparkles className="h-2.5 w-2.5" />
                PRO
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <div className="mt-1 flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                <Award className="h-3 w-3" />
                {user.reputation} builder score
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-border/80" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted focus:bg-muted"
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FolderGit2 className="mr-2 h-3.5 w-3.5 text-accent" />
            <span>My Projects ({user.projectsCount})</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted focus:bg-muted"
            onClick={() => {
              const el = document.getElementById("ideas");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Bookmark className="mr-2 h-3.5 w-3.5 text-accent" />
            <span>Saved Ideas & Bookmarks</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-border/80" />

        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MobileDrawerUserProfile() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="font-bold bg-accent/20 text-accent-contrast">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-sm font-bold text-foreground">{user.name}</h4>
            <span className="inline-flex rounded bg-accent/20 px-1 py-0.2 text-[10px] font-bold text-accent-contrast">
              PRO
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/80 pt-2.5 text-xs text-muted-foreground">
        <span>Reputation</span>
        <span className="font-semibold text-accent">{user.reputation} pts</span>
      </div>

      <button
        type="button"
        onClick={signOut}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20 cursor-pointer"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
