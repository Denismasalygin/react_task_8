import { Container, Paper, Stack, Typography } from "@mui/material";

import { SignupForm } from "@/features/auth/signup/ui/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Регистрация
          </Typography>

          <Typography sx={{ textAlign: "center" }} color="text.secondary">
            Создайте аккаунт, чтобы продолжить
          </Typography>

          <SignupForm />
          <Typography sx={{ textAlign: "center" }} color="text.secondary">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" style={{ color: "#1976d2" }}>
              Войти
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
