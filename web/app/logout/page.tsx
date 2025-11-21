"use client";
import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LogoutPage() {
  useEffect(() => {
    (async () => {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    })();
  }, []);
  return <div className="p-4">????? ??????...</div>;
}

