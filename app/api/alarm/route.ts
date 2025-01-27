import { cache, get } from "@/lib/cache.service";
import { DataService } from "@/lib/usrcloud.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  // 1. 获取Token
  const projectId = "323324";

  // 2. 获取用户信息
  const result = await DataService.getAlarmData();

  // const result = await fetch("https://echarts.apache.org/examples/data/asset/geo/HK.json", {
  //     method: "GET"
  // })

  // const data = await result.json();
  return NextResponse.json({
    data: result
  });
}
