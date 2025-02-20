import { OrgService } from "@/lib/usrcloud.service";
import { NextResponse } from "next/server";

export async function GET() {
    // 1. 获取Token
    // const token = await get("token");

    // 2. 获取用户信息
    const provinceList = await OrgService.getProvinceList()

    // const result = await fetch("https://echarts.apache.org/examples/data/asset/geo/HK.json", {
    //     method: "GET"
    // })

    // const data = await result.json();
    return NextResponse.json({
        // token: token,
        provinceList: provinceList,
        //
    })
}