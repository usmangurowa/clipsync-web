"use server";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { createClient } from "@/supabase/server";
import { login_schema, profile_schema } from "@/schema";
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
      redirectTo: `${process.env.WEB_URL}/auth/callback`,
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
  .schema(login_schema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  });

export const verify_otp = actionClient
  .schema(
    z.object({
      otp: z.string().length(6),
      ...login_schema.shape,
    }),
  )
  .action(async ({ parsedInput: { email, otp } }) => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
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
        // supabase
        //   .from("profile")
        //   .upsert({ ...payload, id: session?.user.id })
        //   .select()
        //   .throwOnError(),
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
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
});
