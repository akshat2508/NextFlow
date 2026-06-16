import { NextResponse } from "next/server";

import { WorkflowService } from "@/lib/services";

import { requireUser } from "@/lib/auth/clerk";

export async function GET(
  _: Request,
  {
    params
  }: {
    params: Promise<{
      workflowId: string;
    }>;
  }
) {
  try {
    await requireUser();

    const { workflowId } =
      await params;

    const workflow =
      await new WorkflowService().getWorkflow(
        workflowId
      );

    return NextResponse.json(
      workflow
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

export async function PATCH(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      workflowId: string;
    }>;
  }
) {
  try {
    await requireUser();

    const body =
      await request.json();

    const { workflowId } =
      await params;

    const workflow =
      await new WorkflowService().saveWorkflow(
        workflowId,
        body.nodes,
        body.edges
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

export async function DELETE(
  _: Request,
  {
    params
  }: {
    params: Promise<{
      workflowId: string;
    }>;
  }
) {
  try {
    await requireUser();

    const { workflowId } =
      await params;

    await new WorkflowService().deleteWorkflow(
      workflowId
    );

    return NextResponse.json({
      success: true
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed"
      },
      {
        status: 400
      }
    );
  }
}