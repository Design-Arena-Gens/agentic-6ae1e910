import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { clientEnv } from "@/lib/env";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;
    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "??? ????" }, { status: 401 });
    }

    if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: "Service role key ??? ?????" },
        { status: 500 }
      );
    }
    const admin = createClient(
      clientEnv.NEXT_PUBLIC_SUPABASE_URL || "",
      serverEnv.SUPABASE_SERVICE_ROLE_KEY
    );
    const userClient = createClient(
      clientEnv.NEXT_PUBLIC_SUPABASE_URL || "",
      clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
    // get user id from auth
    const { data: userData, error: userErr } = await userClient.auth.getUser(
      accessToken
    );
    if (userErr || !userData.user) {
      return NextResponse.json({ error: "??? ????" }, { status: 401 });
    }
    const uid = userData.user.id;
    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "???" }, { status: 500 });
  }
}

