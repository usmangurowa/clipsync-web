"use server";
import { actionClient } from "@/lib/safe-action";
import { Database } from "@/supabase/db-types";
import { createClient } from "@/supabase/server";
import { categorize } from "text-categorizer";
import { z } from "zod";

export const addClip = actionClient
  .schema(
    z.object({
      content: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const meta = categorize(parsedInput.content);
    const { data, error } = await supabase
      .from("clipboard")
      .insert({
        ...parsedInput,
        category:
          meta.type as Database["public"]["Enums"]["clipboard_category"],
        meta: meta.metadata || null,
      })
      .select();
    if (error) {
      throw error;
    }

    return data;
  });

export const deleteClip = actionClient
  .schema(z.object({ id: z.string().uuid() }))
  .action(async ({ parsedInput }) => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("clipboard")
        .delete()
        .match({ id: parsedInput.id })
        .select()
        .throwOnError();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  });
