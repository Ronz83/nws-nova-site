import { createClient } from '@supabase/supabase-js'

const getEnv = (key: string) => {
  const gProcess = (globalThis as any).process;
  if (gProcess && gProcess.env && gProcess.env[key]) {
    return gProcess.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
