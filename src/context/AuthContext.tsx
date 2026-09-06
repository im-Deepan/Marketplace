import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  reputation: number;
  projectsCount: number;
}

export const DEMO_USERS: User[] = [
  {
    id: "user-1",
    name: "Alex Chen",
    email: "alex.chen@maker.dev",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "AC",
    role: "IoT & Hardware Architect",
    reputation: 1420,
    projectsCount: 6,
  },
  {
    id: "user-2",
    name: "Elena Rostova",
    email: "elena.r@robotics.io",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    initials: "ER",
    role: "Robotics & Embedded Engineer",
    reputation: 980,
    projectsCount: 4,
  },
  {
    id: "user-3",
    name: "Marcus Vance",
    email: "marcus.v@automation.co",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "MV",
    role: "Full Stack Hardware Maker",
    reputation: 2150,
    projectsCount: 9,
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSignInOpen: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
  signIn: (userData?: Partial<User>) => void;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "projecthub_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Initialize from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (err) {
        console.error("Failed to load stored user", err);
      }
    }
  }, []);

  const openSignIn = useCallback(() => setIsSignInOpen(true), []);
  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);

  const signIn = useCallback((userData?: Partial<User>) => {
    const baseUser = DEMO_USERS[0];
    const newUser: User = {
      id: userData?.id || baseUser.id,
      name: userData?.name || baseUser.name,
      email: userData?.email || baseUser.email,
      avatar: userData?.avatar || baseUser.avatar,
      initials: (userData?.name || baseUser.name)
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      role: userData?.role || baseUser.role,
      reputation: userData?.reputation ?? baseUser.reputation,
      projectsCount: userData?.projectsCount ?? baseUser.projectsCount,
    };

    setUser(newUser);
    setIsSignInOpen(false);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } catch (err) {
        console.error("Failed to persist user session", err);
      }
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error("Failed to clear user session", err);
      }
    }
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error("Failed to update user session", err);
        }
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSignInOpen,
        openSignIn,
        closeSignIn,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
