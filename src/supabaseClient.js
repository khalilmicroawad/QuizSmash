import { createClient } from "@supabase/supabase-js";

// ============================================================================
// ⚙️ SUPABASE CONFIGURATION CREDENTIALS
// Paste your Supabase Project URL and Public Anon Key below:
// (Find these in your Supabase Dashboard -> Project Settings -> API)
// ============================================================================

// 👉 1. PASTE YOUR SUPABASE URL HERE:
const SUPABASE_URL = "https://zmsovxqdbhqthluoznmz.supabase.co";

// 👉 2. PASTE YOUR SUPABASE PUBLIC / ANON KEY HERE:
const SUPABASE_PUBLIC_KEY = "sb_publishable_peqXXt72cHyLnJ4GiVmFYQ_P9GiUrOW";

// Initialize and export the single Supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
