import { cache, get } from "@/lib/cache.service";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await get("token");
  return NextResponse.json({
    isCached: cache.isCached("token"),
    token: token,
  });
}
