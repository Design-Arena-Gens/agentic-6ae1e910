"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function OtpPage() {
  const supabase = createSupabaseBrowserClient();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const sendCode = async () => {
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });
    if (error) setError(error.message);
    else {
      setSent(true);
      setMessage("?? ????? ??? ?????? ??? SMS");
    }
  };

  const verify = async () => {
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });
    if (error) setError(error.message);
    else window.location.href = "/";
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">?????? ???? ??????</h1>

      {!sent ? (
        <div className="space-y-3">
          <label className="block text-sm">??? ?????? (?? ??? ??????)</label>
          <input
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+9665xxxxxxx"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            onClick={sendCode}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
          >
            ????? ?????
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm">???? ??? ??????</label>
          <input
            dir="ltr"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={verify}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
          >
            ????
          </button>
        </div>
      )}
    </div>
  );
}

