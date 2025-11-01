import { NextRequest, NextResponse } from "next/server";
import { generateCulinaryTasks } from "@/lib/seedTasks";

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId is required",
        },
        { status: 400 }
      );
    }

    // Generate tasks for the user
    const taskData = generateCulinaryTasks(userId);

    // Delete existing tasks for this user (optional - comment out if you want to keep them)
    // await prisma.task.deleteMany({
    //   where: { userId },
    // });

    // Create tasks in batch
    const tasks = await prisma.task.createMany({
      data: taskData,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: `${tasks.count} tasks created successfully`,
      data: { count: tasks.count },
    });
  } catch (error) {
    console.error("Error seeding tasks:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed tasks",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
