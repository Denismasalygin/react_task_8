export interface User {
  id: string;
  email: string;
  createdAt?: string;
  role?: string;
  profile?: {
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string | null;
  } | null;
}
