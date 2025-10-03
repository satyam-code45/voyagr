import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Trip } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { destination, startDate, endDate, activities } = body;

    if (!destination || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields: destination, startDate, endDate" }, 
        { status: 400 }
      );
    }

    const trip = await prisma.trip.create({
      data: {
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: session.user.id,
        activities: {
          create: activities?.map((activity: any) => ({
            day: activity.day,
            time: activity.time,
            description: activity.description,
          })) || [],
        },
      },
      include: {
        activities: {
          orderBy: [{ day: "asc" }, { time: "asc" }],
        },
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Failed to create trip" }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        activities: {
          orderBy: [{ day: "asc" }, { time: "asc" }],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" }, 
      { status: 500 }
    );
  }
}