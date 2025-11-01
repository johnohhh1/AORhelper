import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Dynamic import for Prisma to avoid build-time issues
// @ts-ignore
const getPrisma = async () => {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Validation schema for culinary metrics
const culinaryMetricSchema = z.object({
  userId: z.string(),
  date: z.string(),
  role: z.literal("CULINARY"),
  foodGreat72: z.number().min(0).max(100),
  safeScore: z.number().min(0).max(100),
  specSold100: z.number().min(0).max(100),
  tmsAbove72: z.number().int().min(0),
  pullThaw: z.number().min(0).max(100),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await request.json();

    // Validate the request body
    const validatedData = culinaryMetricSchema.parse(body);

    // Check if metric already exists for this date and user
    const existingMetric = await prisma.metric.findUnique({
      where: {
        userId_date_role: {
          userId: validatedData.userId,
          date: new Date(validatedData.date),
          role: validatedData.role,
        },
      },
    });

    let metric;

    if (existingMetric) {
      // Update existing metric
      metric = await prisma.metric.update({
        where: {
          id: existingMetric.id,
        },
        data: {
          foodGreat72: validatedData.foodGreat72,
          safeScore: validatedData.safeScore,
          specSold100: validatedData.specSold100,
          tmsAbove72: validatedData.tmsAbove72,
          pullThaw: validatedData.pullThaw,
          notes: validatedData.notes,
        },
      });
    } else {
      // Create new metric
      metric = await prisma.metric.create({
        data: {
          userId: validatedData.userId,
          date: new Date(validatedData.date),
          role: validatedData.role,
          foodGreat72: validatedData.foodGreat72,
          safeScore: validatedData.safeScore,
          specSold100: validatedData.specSold100,
          tmsAbove72: validatedData.tmsAbove72,
          pullThaw: validatedData.pullThaw,
          notes: validatedData.notes,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: existingMetric ? "Metrics updated successfully" : "Metrics saved successfully",
      data: metric,
    });
  } catch (error) {
    console.error("Error saving metrics:", error);

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
        message: "Failed to save metrics",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const prisma = await getPrisma();
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");
    const date = searchParams.get("date");

    if (!userId || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "userId and role are required",
        },
        { status: 400 }
      );
    }

    let metrics;

    if (date) {
      // Get metric for specific date
      const metric = await prisma.metric.findUnique({
        where: {
          userId_date_role: {
            userId,
            date: new Date(date),
            role: role as "CULINARY" | "HOSPITALITY" | "TOGO_BAR" | "GM",
          },
        },
      });

      return NextResponse.json({
        success: true,
        data: metric,
      });
    } else {
      // Get all metrics for user and role
      metrics = await prisma.metric.findMany({
        where: {
          userId,
          role: role as "CULINARY" | "HOSPITALITY" | "TOGO_BAR" | "GM",
        },
        orderBy: {
          date: "desc",
        },
        take: 30, // Last 30 entries
      });

      return NextResponse.json({
        success: true,
        data: metrics,
      });
    }
  } catch (error) {
    console.error("Error fetching metrics:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch metrics",
      },
      { status: 500 }
    );
  }
}
