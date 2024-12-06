import { createClient } from "@/supabase/client";
import useSWR from "swr";

const getClips = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clipboard")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

const useClips = () => {
  const { data, ...rest } = useSWR("clips", getClips);

  return { data, ...rest };
};

export { useClips };
