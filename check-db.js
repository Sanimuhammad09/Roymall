import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDb() {
  console.log("Checking products table...");
  const { data: products, error: pError } = await supabase.from('products').select('*').limit(1);
  if (pError) console.error("Products error:", pError.message);
  else console.log(`Products table exists. Contains ${products.length > 0 ? 'data' : 'no data'}.`);

  console.log("Checking orders table...");
  const { data: orders, error: oError } = await supabase.from('orders').select('*').limit(1);
  if (oError) console.error("Orders error:", oError.message);
  else console.log(`Orders table exists. Contains ${orders.length > 0 ? 'data' : 'no data'}.`);
  
  console.log("Checking users table...");
  const { data: users, error: uError } = await supabase.from('users').select('*').limit(1);
  if (uError) console.error("Users error:", uError.message);
  else console.log(`Users table exists. Contains ${users.length > 0 ? 'data' : 'no data'}.`);
}

checkDb();
