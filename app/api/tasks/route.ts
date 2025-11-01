import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Validation schema for task completion
const taskCompleteSchema = z.object({
  taskId: z.string(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");
    const filter = searchParams.get("filter"); // "today", "week", "overdue", "all"

    if (!userId || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "userId and role are required",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    let whereClause: any = {
      userId,
      role: role as "CULINARY" | "HOSPITALITY" | "TOGO_BAR" | "GM",
    };

    // Apply filters
    if (filter === "today") {
      whereClause.dueDate = {
        gte: today,
        lte: endOfToday,
      };
      whereClause.completedAt = null;
    } else if (filter === "week") {
      whereClause.dueDate = {
        gte: today,
        lte: endOfWeek,
      };
      whereClause.completedAt = null;
    } else if (filter === "overdue") {
      whereClause.dueDate = {
        lt: today,
      };
      whereClause.completedAt = null;
    } else if (filter === "completed") {
      whereClause.completedAt = {
        not: null,
      };
    } else {
      // "all" - no additional filter, but exclude very old completed tasks
      whereClause.OR = [
        { completedAt: null },
        {
          completedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      ];
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: [
        { dueDate: "asc" },
        { createdAt: "desc" },
      ],
      take: 100,
    });

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasks",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();

    // Validate the request body
    const validatedData = taskCompleteSchema.parse(body);

    // Mark task as complete
    const task = await prisma.task.update({
      where: {
        id: validatedData.taskId,
      },
      data: {
        completedAt: new Date(),
        notes: validatedData.notes,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Task marked complete",
      data: task,
    });
  } catch (error) {
    console.error("Error completing task:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to complete task",
      },
      { status: 500 }
    );
  }
}
