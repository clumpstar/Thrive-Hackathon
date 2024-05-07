import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase URL and API key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Create Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
