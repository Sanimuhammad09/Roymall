import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProducts() {
  console.log("Fetching products with ANON key...");
  const { data, error } = await supabase.from('products').select('*').limit(5);
  
  if (error) {
    console.error("Error fetching:", error);
  } else {
    console.log(`Successfully fetched ${data.length} products.`);
    if (data.length === 0) {
      console.log("RLS is likely blocking read access for the Anon key.");
    } else {
      console.log(data.map(p => p.name));
    }
  }
}

checkProducts();
