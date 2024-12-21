import { createClient } from "@/supabase/client";
import useSWR from "swr";

type QueryTypes = {
  q: string;
};

const getClips = async (query?: QueryTypes) => {
  const supabase = createClient();
  const clipsQuery = supabase.from("clipboard").select("*");
  console.log(query?.q);
  if (query?.q) {
    clipsQuery.ilike("content", `%${query.q}%`);
  }

  const { data, error } = await clipsQuery.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw error;
  }
  return data;
};

const useClips = (query?: QueryTypes) =>
  useSWR(["clips", query], () => getClips(query));

export { useClips };
