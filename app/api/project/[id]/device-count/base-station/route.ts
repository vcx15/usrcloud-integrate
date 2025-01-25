import { DeviceService, UserService } from "@/lib/usrcloud.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. 获取Token
  // const token = await get("token");
  const projectId = (await params).id;

  // 2. 获取用户信息
  const baseStationCount = await DeviceService.getBaseStationCount(projectId);

  // const result = await fetch("https://echarts.apache.org/examples/data/asset/geo/HK.json", {
  //     method: "GET"
  // })

  // const data = await result.json();
  return NextResponse.json({
    // token: token,
    count: baseStationCount,
    //
  });
}
