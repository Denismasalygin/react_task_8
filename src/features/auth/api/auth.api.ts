import type { User } from "@/entities/user/model/user.types";
import type { AuthResponse, LoginCredentials, SignupCredentials } from "./auth.types";

export type AuthErrorCode = "USER_NOT_FOUND" | "INVALID_CREDENTIALS" | "EMAIL_ALREADY_USED";

export class AuthApiError extends Error {
  constructor(public code: AuthErrorCode) {
    super(code);
    this.name = "AuthApiError";
  }
}

const API_URL = "http://localhost:3001/api/auth";

async function authRequest(
  endpoint: string,
  credentials?: LoginCredentials | SignupCredentials,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(credentials && {
      body: JSON.stringify(credentials),
    }),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new AuthApiError("EMAIL_ALREADY_USED");
    }

    if (response.status === 401) {
      throw new AuthApiError("INVALID_CREDENTIALS");
    }

    throw new Error("Authentication request failed");
  }

  return response.json();
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return authRequest("login", credentials);
}

export async function signup(credentials: SignupCredentials): Promise<AuthResponse> {
  return authRequest("signup", credentials);
}

export async function logout(): Promise<void> {
  await authRequest("logout");
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Session is invalid or expired");
  }

  const data: { user: User } = await response.json();

  return data.user;
}
