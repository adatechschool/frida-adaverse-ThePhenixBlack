// app/api/ada-projects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { promotions } from "@/db/schema";

export async function GET() {
  const projects = await db
    .select({
      id: promotions.id,
      name: promotions.name,
    })
    .from(promotions);

  return NextResponse.json(projects);
}