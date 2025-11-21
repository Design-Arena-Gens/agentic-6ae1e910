import Link from "next/link";
import data from "@/data/menu.json";

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">???????</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {data.categories.map((c) => (
          <Link
            key={c.key}
            href={`/menu/${c.key}`}
            className="group rounded-xl border border-zinc-200 bg-white p-4 text-center hover:border-orange-300 hover:shadow-sm"
          >
            <div className="text-3xl">???</div>
            <div className="mt-2 font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

