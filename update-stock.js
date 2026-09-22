import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Service Role Key in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateStock() {
  console.log("Updating all product stocks to 100...");
  // Using update with a neq id to match all, or just call rpc if there's no better way.
  // Actually, we can just do an update without eq if we bypass it, wait, Supabase JS requires an eq or filter to avoid accidental mass updates.
  // We can use `.gt('price', -1)` which matches all since price >= 0.
  const { data, error } = await supabase
    .from('products')
    .update({ stock: 100 })
    .gte('price', 0);
  
  if (error) {
    console.error("Error updating stock:", error.message);
  } else {
    console.log(`Successfully updated stock for all products to 100.`);
  }
}

updateStock();
