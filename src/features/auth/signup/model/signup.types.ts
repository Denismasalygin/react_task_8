import type { z } from "zod";
import { signupSchema } from "@/shared/lib/validation/auth";

export type SignupFormValues = z.infer<typeof signupSchema>;
