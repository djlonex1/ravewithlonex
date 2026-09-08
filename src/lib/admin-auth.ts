import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const adminEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (
    !adminEmail ||
    user.email?.toLowerCase() !== adminEmail
  ) {
    return null;
  }

  return user;
}
