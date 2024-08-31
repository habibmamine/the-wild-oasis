import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tyjfaisnvcopdqblukqh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5amZhaXNudmNvcGRxYmx1a3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5ODM0MjgsImV4cCI6MjAzOTU1OTQyOH0.5yyyKCBfBARwUJxJYsRoC9pGiWo_FwoqkMJcJpYw0yA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
