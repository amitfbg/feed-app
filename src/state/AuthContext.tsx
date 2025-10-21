import React, { createContext, useEffect, useContext, useState } from "react";
import { User, Credentials } from "../types";
import {
  STORAGE_KEY,
  PREDEFINED_USERS,
  USERS_STORAGE_KEY,
  encodePassword,
} from "../constants";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signInWithPassword: (
    email: string,
    password: string
  ) => { success: boolean; error: string | null };
  register: (
    email: string,
    password: string
  ) => { ok: boolean; error?: string };
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  signInWithPassword: () => ({ success: false, error: null }),
  register: () => ({ ok: false, error: "not implemented" }),
  signOut: () => {},
});

const normalize = (e: string) => e.trim().toLowerCase();

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // current user
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  // registered users (predefined + any that the user signs up)
  const [users, setUsers] = useState<Credentials[]>(() => {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as Credentials[];
      } catch {
        // Return predefined users if parsing fails
        return PREDEFINED_USERS;
      }
    }
    // first run: seed with predefined users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(PREDEFINED_USERS));
    return PREDEFINED_USERS;
  });

  // persist on changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const signInWithPassword = (
    email: string,
    password: string
  ): { success: boolean; error: string | null } => {
    const norm = normalize(email);
    const encoded = encodePassword(password);
    const matchingUser = users.find((u) => normalize(u.email) === norm);
    if (!matchingUser) {
      return { success: false, error: "Please sign up first" };
    }

    if (matchingUser.password !== encoded) {
      return { success: false, error: "Invalid password" };
    }

    setUser({ email: matchingUser.email });
    return { success: true, error: null };
  };

  const register = (email: string, password: string) => {
    const norm = normalize(email);
    if (!norm || !password) {
      return { ok: false, error: "Email and password are required" };
    }

    // prevent duplicates / reserved emails
    const exists = users.some((u) => normalize(u.email) === norm);
    if (exists) {
      return { ok: false, error: "Email already registered" };
    }

    const newUser: Credentials = {
      email: norm,
      password: encodePassword(password),
    };
    setUsers((prev) => [...prev, newUser]);
    setUser({ email: norm });
    return { ok: true };
  };

  const signOut = () => setUser(null);

  const value = {
    user,
    isAuthenticated: !!user,
    signInWithPassword,
    register,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
