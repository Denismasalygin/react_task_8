import { create } from "zustand";

import type { User } from "@/entities/user/model/user.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;

  setUser: (user: User) => void;
  logout: () => void;
  setAuthChecked: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      isAuthChecked: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAuthChecked: true,
    }),

  setAuthChecked: (value) => set({ isAuthChecked: value }),
}));
