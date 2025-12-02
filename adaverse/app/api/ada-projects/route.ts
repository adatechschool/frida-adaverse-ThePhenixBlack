// app/api/ada-projects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { ada_projects } from "@/db/schema";

export async function GET() {
  const projects = await db
    .select({
      id: ada_projects.id,
      name: ada_projects.name,
    })
    .from(ada_projects);

  return NextResponse.json(projects);
}