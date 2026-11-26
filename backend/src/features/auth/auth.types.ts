export interface AuthUser {
  id: string;
  email: string;
  role: string;
  profile: {
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string | null;
  } | null;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
