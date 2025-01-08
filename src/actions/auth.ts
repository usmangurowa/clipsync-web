"use server";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/supabase/server";
import {
  auth_schema,
  email_schema,
  profile_schema,
  reset_password_schema,
} from "@/schema";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }

  return data.session;
};

export const login_with_github = actionClient.action(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (data.url) {
    redirect(data.url);
  }
});

export const login_with_email = actionClient
  .schema(email_schema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (error) {
      throw error;
    }

    return redirect("/auth/verify?email=" + email);
  });

export const login_with_email_and_password = actionClient
  .schema(auth_schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return redirect("/clipboard");
  });

export const register_with_email_and_password = actionClient
  .schema(auth_schema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return redirect("/auth/verify?email=" + email);
  });

export const verify_otp = actionClient
  .schema(
    z.object({
      otp: z.string().length(6),
      ...email_schema.shape,
    }),
  )
  .action(async ({ parsedInput: { email, otp } }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      throw error;
    }

    return redirect("/clipboard");
  });

export const update_profile = actionClient
  .schema(profile_schema)
  .action(async ({ parsedInput: payload }) => {
    try {
      const supabase = await createClient();
      // const session = await getSession();
      const data = await Promise.all([
        supabase.auth.updateUser({
          data: payload,
        }),
      ]);

      const error = data.find((d) => d.error);
      if (error && error.error) {
        throw new Error(error.error.message);
      }
      return data?.[0].data;
    } catch (error) {
      throw error;
    }
  });

export const logout = actionClient.action(async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/sign-in");
});

export const forgot_password = actionClient
  .schema(email_schema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }

    return data;
  });

export const reset_password = actionClient
  .schema(reset_password_schema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: parsedInput.password,
    });

    if (error) {
      throw error;
    }

    return redirect("/");
  });
