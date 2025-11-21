"use client";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Address = {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city?: string;
  notes?: string;
};

export default function ProfilePage() {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        setUserId(user.id);
        setEmail(user.email ?? "");
        setFullName((user.user_metadata as any)?.full_name ?? "");
        setPhone(user.phone ?? (user.user_metadata as any)?.phone ?? "");
        setInstructions((user.user_metadata as any)?.delivery_instructions ?? "");
        setAvatarUrl((user.user_metadata as any)?.avatar_url ?? null);
        setAddresses((user.user_metadata as any)?.addresses ?? []);
      }
      setLoading(false);
    })();
  }, []);

  const saveProfile = async () => {
    setError(null);
    setMessage(null);
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone,
        delivery_instructions: instructions,
        avatar_url: avatarUrl,
        addresses,
      },
    });
    if (error) setError(error.message);
    else setMessage("?? ??? ????????");
  };

  const onUpload = async (file: File) => {
    const filePath = `${userId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true });
    if (error) {
      setError(error.message);
      return;
    }
    const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
    setAvatarUrl(data.publicUrl);
  };

  const addAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: "????? ????",
        line1: "",
        city: "",
      },
    ]);
  };

  const deleteAccount = async () => {
    setError(null);
    setMessage(null);
    const res = await fetch("/api/account/delete", { method: "POST" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "???? ??? ??????");
    } else {
      window.location.href = "/logout";
    }
  };

  if (loading) {
    return <div className="p-4">???? ???????...</div>;
  }

  if (!userId) {
    return (
      <div className="p-4">
        ????? ?????? ?????? ?????. <a className="text-orange-600" href="/login">????? ??????</a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">?????</h1>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-100">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <label className="cursor-pointer rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
            ??? ????
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) onUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-3">
          <div>
            <label className="mb-1 block text-sm">?????</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">??? ??????</label>
            <input
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">?????? ??????????</label>
            <input
              dir="ltr"
              value={email}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">??????? ???????</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-24 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveProfile}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
            >
              ???
            </button>
            {message && <span className="text-sm text-green-600">{message}</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">????????</h2>
          <button
            onClick={addAddress}
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
          >
            ????? ?????
          </button>
        </div>
        <div className="grid gap-3">
          {addresses.map((addr, idx) => (
            <div key={addr.id} className="rounded-lg border border-zinc-200 p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  value={addr.label}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAddresses((prev) => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], label: v };
                      return copy;
                    });
                  }}
                  className="rounded-lg border border-zinc-200 px-3 py-2"
                  placeholder="?????? / ?????"
                />
                <input
                  value={addr.line1}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAddresses((prev) => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], line1: v };
                      return copy;
                    });
                  }}
                  className="rounded-lg border border-zinc-200 px-3 py-2"
                  placeholder="??????"
                />
                <input
                  value={addr.city ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAddresses((prev) => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], city: v };
                      return copy;
                    });
                  }}
                  className="rounded-lg border border-zinc-200 px-3 py-2"
                  placeholder="???????"
                />
                <input
                  value={addr.notes ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAddresses((prev) => {
                      const copy = [...prev];
                      copy[idx] = { ...copy[idx], notes: v };
                      return copy;
                    });
                  }}
                  className="rounded-lg border border-zinc-200 px-3 py-2"
                  placeholder="???????"
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={() =>
                    setAddresses((prev) => prev.filter((a) => a.id !== addr.id))
                  }
                  className="text-sm text-red-600 hover:underline"
                >
                  ???
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <button
            onClick={saveProfile}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
          >
            ??? ????????
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <h2 className="mb-2 text-lg font-semibold text-red-700">??? ??????</h2>
        <p className="text-sm text-red-700/90">
          ??? ??????? ????? ?????? ??? ??? ?????? ?????.
        </p>
        <button
          onClick={deleteAccount}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          ??? ??????
        </button>
      </div>
    </div>
  );
}

