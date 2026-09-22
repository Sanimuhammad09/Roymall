import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adfawgyfwtubciiblqgd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZmF3Z3lmd3R1YmNpaWJscWdkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDA3MzM4OCwiZXhwIjoyMTA1NjQ5Mzg4fQ.Jr9Jo7DOSsdnC5vJBjzWtkBQ-jY5Z7eY-Ey2Uhm-D0c';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('products').select('*').limit(5);
  console.log('Sample products:', data);
  
  if (data && data.length > 0) {
    const ids = data.map(p => p.id);
    const { data: updateData, error: updateError } = await supabase.from('products').update({ stock: 100 }).in('id', ids).select();
    console.log('Update result:', updateData, updateError);
  }
}

check();
