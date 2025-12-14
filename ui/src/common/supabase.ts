import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://phdoimejezjrvplwdcnb.supabase.co",
  "sb_publishable_yXiZA3fiHkY_by0CVkzO0w_2Pdivn27",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
