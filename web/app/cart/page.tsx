"use client";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const cart = useCart();
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">??? ??????</h1>
      {cart.items.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          ????? ?????
        </div>
      ) : (
        <div className="space-y-3">
          {cart.items.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-zinc-600">{i.price} ?.?</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e) => cart.setQty(i.id, Math.max(1, Number(e.target.value)))}
                  className="w-16 rounded-lg border border-zinc-200 px-2 py-1 text-center"
                />
                <button
                  onClick={() => cart.remove(i.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  ?????
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 font-semibold">
            <div>????????</div>
            <div>{cart.total} ?.?</div>
          </div>
          <a
            href="/checkout"
            className="block rounded-lg bg-zinc-900 px-4 py-2 text-center text-white hover:bg-zinc-800"
          >
            ????? ?????
          </a>
        </div>
      )}
    </div>
  );
}

