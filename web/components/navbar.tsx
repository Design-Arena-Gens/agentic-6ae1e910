import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/favicon.ico" alt="logo" width={28} height={28} />
          <span className="text-lg font-semibold">??? ?????</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-zinc-700">
            ????????
          </Link>
          <Link href="/menu" className="hover:text-zinc-700">
            ???????
          </Link>
          <Link href="/offers" className="hover:text-zinc-700">
            ??????
          </Link>
          <Link href="/cart" className="hover:text-zinc-700">
            ?????
          </Link>
          <Link href="/orders" className="hover:text-zinc-700">
            ??????
          </Link>
          <Link href="/profile" className="hover:text-zinc-700">
            ?????
          </Link>
        </nav>
      </div>
    </header>
  );
}

