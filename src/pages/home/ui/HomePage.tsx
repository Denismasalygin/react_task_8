"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Container, Paper, Stack, Typography } from "@mui/material";

import { useAuthStore } from "@/features/auth/model/auth.store";
import { logout as logoutRequest } from "@/features/auth/api/auth.api";

export default function HomePage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const logout = useAuthStore((state) => state.logout);

  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  const handleLogout = async () => {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await logoutRequest();
      logout();
      router.replace("/auth/login");
    } catch {
      setLogoutError("Не удалось выйти из аккаунта. Попробуйте ещё раз.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthChecked || !isAuthenticated) return null;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <Typography variant="h4">Главная страница</Typography>

          <Typography color="text.secondary">Вы авторизованы как:</Typography>

          <Typography variant="h6">{user?.email}</Typography>

          {logoutError && <Alert severity="error">{logoutError}</Alert>}

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            disabled={isLoggingOut}
            fullWidth
          >
            {isLoggingOut ? "Выходим..." : "Выйти"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
