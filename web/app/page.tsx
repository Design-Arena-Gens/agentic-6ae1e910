import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { key: 'meals', name: '???????', icon: '???' },
  { key: 'drinks', name: '?????????', icon: '??' },
  { key: 'desserts', name: '????????', icon: '??' },
  { key: 'sandwiches', name: '???????????', icon: '??' },
  { key: 'coffee', name: '????', icon: '?' },
  { key: 'breakfast', name: '??????', icon: '??' },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <section className="mt-4 rounded-2xl bg-gradient-to-l from-orange-100 to-amber-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">????? ?? ?? ??? ?????</h1>
            <p className="mt-1 text-zinc-600">???? ???? ??????? ?? ???? ?????</p>
          </div>
          <Image src="/favicon.ico" width={48} height={48} alt="logo" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            placeholder="???? ?? ??? ?? ???..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none ring-orange-200 focus:ring-2"
          />
          <Link
            href="/search"
            className="rounded-xl bg-orange-500 px-4 py-3 text-white hover:bg-orange-600"
          >
            ???
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">???????</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/menu/${c.key}`}
              className="group rounded-xl border border-zinc-200 bg-white p-4 text-center hover:border-orange-300 hover:shadow-sm"
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-2 font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">?????? ?????</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm"
            >
              <div className="aspect-video w-full rounded-lg bg-zinc-100" />
              <div className="mt-3 font-semibold">??? ???? #{i}</div>
              <div className="mt-1 text-sm text-zinc-600">??? ??????? 25-35 ?????</div>
              <button className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
                ??? ?????
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">????? ??</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-4 hover:shadow-sm"
            >
              <div className="aspect-video w-full rounded-lg bg-zinc-100" />
              <div className="mt-3 font-semibold">????? ??? #{i}</div>
              <div className="mt-1 text-sm text-zinc-600">??? ??? 20%</div>
              <button className="mt-3 w-full rounded-lg border border-zinc-200 px-4 py-2 hover:bg-zinc-50">
                ??????
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
