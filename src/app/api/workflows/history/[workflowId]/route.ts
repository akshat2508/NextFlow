import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

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
    const userId =
      await requireUser();

    const { workflowId } =
      await params;

    const workflow =
      await prisma.workflow.findFirst({
        where: {
          id: workflowId,
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

    const history =
      await prisma.workflowRun.findMany(
        {
          where: {
            workflowId
          },

          include: {
            nodeRuns: true
          },

          orderBy: {
            createdAt:
              "desc"
          }
        }
      );

    return NextResponse.json(
      history
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