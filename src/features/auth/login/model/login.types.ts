import type { z } from "zod";
import { loginSchema } from "@/shared/lib/validation/auth";

export type LoginFormValues = z.infer<typeof loginSchema>;
