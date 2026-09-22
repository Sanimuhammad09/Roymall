import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const email = 'admin@roymallscents.com.ng';
  const password = 'Admin@roymall123';

  console.log('Attempting to log in or sign up admin user...');
  
  // Try to sign in first
  let { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    if (loginError.message.includes('Invalid login credentials')) {
        console.log("User doesn't exist, signing up...");
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (authError) {
            console.error('Error signing up:', authError.message);
            return;
        }
        
        // Sign in to establish session
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error("Failed to login after signup:", error.message);
            return;
        }
        loginData = data;
    } else {
        console.error("Failed to login:", loginError.message);
        return;
    }
  }

  console.log('Logged in successfully. Updating user metadata to set ADMIN role...');
  
  // Update user metadata directly since the users table doesn't exist yet
  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    data: {
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User'
    }
  });

  if (updateError) {
      console.error("Error updating metadata:", updateError.message);
  } else {
      console.log("✅ Admin user set up successfully and is ready to log in!");
  }
}

createAdmin();
