"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import { useAuthStore } from "@/features/auth/model/auth.store";
import { getCurrentUser } from "@/features/auth/api/auth.api";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked) return;

    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setAuthChecked(true);
      });
  }, [isAuthChecked, setUser, logout, setAuthChecked]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
