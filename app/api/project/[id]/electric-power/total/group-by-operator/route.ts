import { DataService } from "@/lib/usrcloud.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  const result = await DataService.getElectricalPowerGroupByOperator(
    projectId,
    "total"
  );
  return NextResponse.json({
    // token: token,
    data: result,
    //
  });
}
