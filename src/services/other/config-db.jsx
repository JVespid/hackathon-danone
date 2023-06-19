import { createClient } from "@supabase/supabase-js";
export const configSupabase = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  return { supabase };
};
