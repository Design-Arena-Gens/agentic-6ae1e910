"use client";
import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price?: number;
}) {
  const fav = useFavorites();
  const isFav = fav.has(id);
  return (
    <button
      onClick={() => fav.toggle({ id, name, price })}
      className={`rounded-lg border px-3 py-2 text-sm ${
        isFav ? "border-orange-300 bg-orange-50 text-orange-700" : "border-zinc-200 hover:bg-zinc-50"
      }`}
    >
      {isFav ? "???? ???????" : "??? ???????"}
    </button>
  );
}

