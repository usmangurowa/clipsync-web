import { z } from "zod";

export const email_schema = z.object({
  email: z.string().email()
});

export const auth_schema = z.object({
  ...email_schema.shape,
  password: z.string().min(6)
})

export const profile_schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3)
});
