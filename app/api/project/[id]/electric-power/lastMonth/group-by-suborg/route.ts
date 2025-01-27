import { DataService } from "@/lib/usrcloud.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const projectId = (await params).id;
  const result = await DataService.getElectricalPowerGroupBySubOrg(
    projectId,
    "lastMonth"
  );
  return NextResponse.json({
    // token: token,
    data: result,
    //
  });
}