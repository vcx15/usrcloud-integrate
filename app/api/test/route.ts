import { cache, get } from "@/lib/cache.service";
import { DataService } from "@/lib/usrcloud.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. 获取Token
  const deviceId = "0000209098000013";

  // 2. 获取用户信息
  const result = await DataService.getTotalDatapointList(deviceId);

  // const result = await fetch("https://echarts.apache.org/examples/data/asset/geo/HK.json", {
  //     method: "GET"
  // })

  // const data = await result.json();
  return NextResponse.json({
    // token: token,
    count: result,
    //
  });
}
