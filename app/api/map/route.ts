import { NextResponse } from "next/server"

export async function GET() {
    const result = await fetch("https://echarts.apache.org/examples/data/asset/geo/HK.json", {
        method: "GET"
    })

    const data = await result.json();
    return new NextResponse(JSON.stringify(data))
}