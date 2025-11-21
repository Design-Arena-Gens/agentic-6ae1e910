import data from "@/data/menu.json";
import Link from "next/link";
import { FavoriteButton } from "@/components/favorite-button";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const cat = (data as any).categories.find((c: any) => c.key === category);
  const items = (data as any).items.filter((i: any) => i.category === category);
  if (!cat) {
    return <div className="p-4">????? ??? ?????</div>;
  }
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">{cat.name}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item: any) => (
          <div key={item.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="aspect-video w-full rounded-lg bg-zinc-100" />
            <div className="mt-3 flex items-center justify-between">
              <div className="font-semibold">{item.name}</div>
              <div className="text-orange-600">{item.price} ?.?</div>
            </div>
            <div className="mt-1 text-sm text-zinc-600">??????? {item.eta} ?????</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
                ??? ?????
              </button>
              <FavoriteButton id={item.id} name={item.name} price={item.price} />
              <Link
                href={`/menu/${category}/${item.id}`}
                className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-center hover:bg-zinc-50"
              >
                ????????
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

