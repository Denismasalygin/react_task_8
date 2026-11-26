import { Container, Paper, Stack, Typography } from "@mui/material";

import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Вход
          </Typography>

          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            Войдите в свой аккаунт
          </Typography>

          <LoginForm />
          <Typography sx={{ textAlign: "center" }} color="text.secondary">
            Нет аккаунта?{" "}
            <Link href="/auth/signup" style={{ color: "#1976d2" }}>
              Зарегистрироваться
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
