"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setMessage("?? ????? ???? ????? ??????? ??? ?????");
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">????? ????? ???? ??????</h1>
      <div className="space-y-3">
        <label className="block text-sm">?????? ??????????</label>
        <input
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-600">{message}</p>}
        <button
          onClick={submit}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          ????? ??????
        </button>
      </div>
    </div>
  );
}

