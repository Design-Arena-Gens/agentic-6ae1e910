"use client";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const cart = useCart();
  const supabase = createSupabaseBrowserClient();
  const [addressLabel, setAddressLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setLoggedIn(true);
        setAddresses((user.user_metadata as any)?.addresses ?? []);
      }
    })();
  }, []);

  const placeOrder = async () => {
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      // Mock processing
      await new Promise((r) => setTimeout(r, 1200));
      cart.clear();
      setMessage("?? ?????? ????? ?????! ??? ??????? ??????? 25-35 ?????.");
    } catch (e: any) {
      setError(e?.message || "???? ????? ?????");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">????? ?????</h1>
      {!loggedIn && (
        <div className="mb-4 rounded-lg border border-zinc-200 bg-white p-3 text-sm">
          ????????? ?????? <a className="text-orange-600" href="/login">????? ??????</a>
        </div>
      )}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-3 font-semibold">???????</h2>
        <select
          value={addressLabel}
          onChange={(e) => setAddressLabel(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2"
        >
          <option value="">???? ???????</option>
          {addresses.map((a) => (
            <option key={a.id} value={a.label}>
              {a.label} - {a.line1}
            </option>
          ))}
        </select>
        <h2 className="mt-6 mb-3 font-semibold">???? ?????</h2>
        {cart.items.map((i) => (
          <div key={i.id} className="flex items-center justify-between border-b py-2 text-sm">
            <div>{i.name} ? {i.qty}</div>
            <div>{i.price * i.qty} ?.?</div>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between font-semibold">
          <div>????????</div>
          <div>{cart.total} ?.?</div>
        </div>
        {message && <div className="mt-3 rounded-lg bg-green-50 p-3 text-green-700">{message}</div>}
        {error && <div className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">{error}</div>}
        <button
          disabled={submitting || cart.items.length === 0 || !addressLabel}
          onClick={placeOrder}
          className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {submitting ? "???? ????????..." : "????? ?????"}
        </button>
      </div>
    </div>
  );
}

