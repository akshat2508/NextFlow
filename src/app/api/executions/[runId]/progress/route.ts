import {
  NextResponse
} from "next/server";

import {
  getProgress
} from "@/lib/execution/progress-store";

export async function GET(
  _: Request,
  {
    params
  }: {
    params: Promise<{
      runId: string;
    }>;
  }
) {
  const { runId } =
    await params;

  return NextResponse.json(
    getProgress(runId)
  );
}