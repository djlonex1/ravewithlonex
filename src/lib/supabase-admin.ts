import "server-only";

import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.SUPABASE_URL;
const rawSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!rawUrl) {
  throw new Error(
    "SUPABASE_URL is missing from .env.local"
  );
}

if (!rawSecretKey) {
  throw new Error(
    "SUPABASE_SECRET_KEY is missing from .env.local"
  );
}

const supabaseUrl = rawUrl.trim();
const supabaseSecretKey = rawSecretKey.trim();

try {
  new URL(supabaseUrl);
} catch {
  throw new Error(
    `SUPABASE_URL is invalid. It should look like https://your-project.supabase.co`
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);