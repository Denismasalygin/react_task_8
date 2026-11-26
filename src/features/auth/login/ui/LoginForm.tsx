"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/shared/lib/validation/auth";
import { AuthApiError, login } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/features/auth/model/auth.store";
import type { LoginFormValues } from "../model/login.types";

export function LoginForm() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");

    try {
      const response = await login(data);

      setUser(response.user);
      router.replace("/");
    } catch (error) {
      if (error instanceof AuthApiError) {
        switch (error.code) {
          case "USER_NOT_FOUND":
            setServerError("Пользователь с таким email не найден");
            break;

          case "INVALID_CREDENTIALS":
            setServerError("Неверный email или пароль");
            break;

          case "EMAIL_ALREADY_USED":
            setServerError("Этот email уже зарегистрирован");
            break;
        }
      } else {
        setServerError("Не удалось войти. Попробуйте позже.");
      }
    }
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && <Alert severity="error">{serverError}</Alert>}

      <TextField
        {...register("email")}
        label="Email"
        type="email"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        {...register("password")}
        label="Пароль"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
        Войти
      </Button>
    </Stack>
  );
}
