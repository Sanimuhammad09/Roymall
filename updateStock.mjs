import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adfawgyfwtubciiblqgd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZmF3Z3lmd3R1YmNpaWJscWdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA3MzM4OCwiZXhwIjoyMTA1NjQ5Mzg4fQ.Jr9Jo7DOSsdnC5vJBjzWtkBQ-jY5Z7eY-Ey2Uhm-D0c';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Updating stock to 100 for all products...');
  const { data, error } = await supabase.from('products').update({ stock: 100 }).neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
    console.error('Error updating stock:', error);
  } else {
    console.log('Successfully updated stock to 100!');
  }

  console.log('Setting placeholder image for products with no image...');
  const { data: imgData, error: imgError } = await supabase.from('products')
    .update({ image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop' })
    .is('image', null);
  
  if (imgError) {
    console.error('Error updating image:', imgError);
  } else {
    console.log('Successfully updated images!');
  }
}

run();
