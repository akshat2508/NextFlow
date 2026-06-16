import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/clerk";

import { WorkflowService } from "@/lib/services";

export async function GET() {
  try {
    const userId =
      await requireUser();

    const workflows =
      await new WorkflowService().getWorkflows(
        userId
      );

    return NextResponse.json(
      workflows
    );
  } catch {
    return NextResponse.json(
      {
        error: "Unauthorized"
      },
      {
        status: 401
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const userId =
      await requireUser();

    const body =
      await request.json();

    const workflow =
      await new WorkflowService().createWorkflow(
        userId,
        body.name
      );

    return NextResponse.json(
      workflow
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed"
      },
      {
        status: 400
      }
    );
  }
}