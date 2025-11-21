export default function OffersPage() {
  const offers = [
    { id: "o1", title: "??? 20% ??? ????????", details: "????? ??????" },
    { id: "o2", title: "???? + ???? ??? ?? 18 ?.?", details: "?????? ?? 4-7 ?????" }
  ];
  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">??????</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {offers.map((o) => (
          <div key={o.id} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-lg font-semibold">{o.title}</div>
            <div className="text-sm text-zinc-600">{o.details}</div>
            <button className="mt-3 rounded-lg border border-zinc-200 px-4 py-2 hover:bg-zinc-50">
              ???? ????
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

