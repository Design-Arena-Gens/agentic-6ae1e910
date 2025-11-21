"use client";
import data from "@/data/menu.json";
import { useFavorites } from "@/lib/favorites";
import Link from "next/link";

export default function FavoritesPage() {
  const fav = useFavorites();
  const items = (data as any).items as any[];
  const favItems = items.filter((i) => fav.items.some((f) => f.id === i.id));
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">???????</h1>
      {favItems.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          ?? ???? ????? ?? ???????.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {favItems.map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <div className="aspect-video w-full rounded-lg bg-zinc-100" />
              <div className="mt-3 flex items-center justify-between">
                <div className="font-semibold">{item.name}</div>
                <div className="text-orange-600">{item.price} ?.?</div>
              </div>
              <div className="mt-1 text-sm text-zinc-600">??????? {item.eta} ?????</div>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/menu/${item.category}/${item.id}`}
                  className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-center hover:bg-zinc-50"
                >
                  ????????
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

