"use client";
import { useMemo, useState } from "react";
import data from "@/data/menu.json";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const items = (data as any).items as any[];
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => {
      const okCat = category === "all" ? true : i.category === category;
      const okText = !t || i.name.toLowerCase().includes(t);
      return okCat && okText;
    });
  }, [q, category, items]);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">?????</h1>

      <div className="grid gap-3 sm:grid-cols-3">
        <input
          dir="rtl"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="???? ?? ???..."
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none"
        >
          <option value="all">?? ???????</option>
          {(data as any).categories.map((c: any) => (
            <option key={c.key} value={c.key}>
              {c.name}
            </option>
          ))}
        </select>
        <div />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="aspect-video w-full rounded-lg bg-zinc-100" />
            <div className="mt-3 flex items-center justify-between">
              <div className="font-semibold">{item.name}</div>
              <div className="text-orange-600">{item.price} ?.?</div>
            </div>
            <div className="mt-1 text-sm text-zinc-600">??????? {item.eta} ?????</div>
            <button className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
              ??? ?????
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

