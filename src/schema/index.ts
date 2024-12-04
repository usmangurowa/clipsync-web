import { z } from "zod";

export const login_schema = z.object({
  email: z.string().email()
});

export const profile_schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3)
});
