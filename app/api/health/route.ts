import { createServiceClient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = createServiceClient();
    const { error } = await client
      .from("profiles")
      .select("count(*)", { count: "exact" });

    if (error) {
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}
