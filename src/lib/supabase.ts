import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Config Error:", { 
    hasUrl: !!supabaseUrl, 
    hasAnonKey: !!supabaseAnonKey,
    urlValue: supabaseUrl ? "Set" : "Missing",
    keyValue: supabaseAnonKey ? "Set" : "Missing"
  });
  throw new Error(`Missing Supabase environment variables. URL is ${supabaseUrl ? 'set' : 'missing'}, Key is ${supabaseAnonKey ? 'set' : 'missing'}.`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
