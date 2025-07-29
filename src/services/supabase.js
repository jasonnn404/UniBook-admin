import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://minmdhmltjguwoioatmi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbm1kaG1sdGpndXdvaW9hdG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjAzMzAsImV4cCI6MjA2NDEzNjMzMH0.oMSed2Y1bl8GIT53kzx5s-u8u6S6dnNQzhfGAtBo0AA";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabaseUrl };
export default supabase;
