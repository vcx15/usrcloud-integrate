import { NextRequest, NextResponse } from "next/server"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const adcode = (await params).id;
    const result = await fetch(
        `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
        {
            method: "GET",
        }
    );
    // const result = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/340000_full.json", {
    //     method: "GET"
    // })

    const data = await result.json();
    return new NextResponse(JSON.stringify(data))
}