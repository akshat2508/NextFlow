import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/clerk";

import { prisma } from "@/lib/db/prisma";

import { ExecutionService } from "@/lib/services";

export async function POST(
  request: Request
) {
  try {
    const userId =
      await requireUser();

    const body =
      await request.json();

    const workflow =
      await prisma.workflow.findFirst({
        where: {
          id: body.workflowId,
          clerkUserId: userId
        }
      });

    if (!workflow) {
      return NextResponse.json(
        {
          error:
            "Workflow not found"
        },
        {
          status: 404
        }
      );
    }

    const result =
      await new ExecutionService().execute(
        {
          workflowId:
            workflow.id,

          nodes:
            workflow.nodes as never,

          edges:
            workflow.edges as never,

          inputs:
            body.inputs
        }
      );

    return NextResponse.json(
      result
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
        status: 500
      }
    );
  }
}