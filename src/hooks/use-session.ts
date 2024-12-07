import { createClient } from "@/supabase/client";
import useSWR from "swr";

const getSession = async () => {
  const supabase = createClient();
  return (await supabase.auth.getSession()).data.session;
};

export const useSession = () => useSWR("session", getSession);
