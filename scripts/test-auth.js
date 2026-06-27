import { createClient } from '@supabase/supabase-js';

// Ignore self-signed certs for this local node script
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUsers() {
  const users = [
    { email: 'admin@nws.com', password: 'password123' },
    { email: 'client@hotelgrand.com', password: 'password123' }
  ];

  for (const u of users) {
    console.log(`\nAttempting to sign up ${u.email}...`);
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
    });

    if (error) {
      console.error(`Sign up error for ${u.email}:`, error.message);
    } else {
      console.log(`Sign up successful for ${u.email}! UUID:`, data?.user?.id);
    }
  }
}

createUsers();
