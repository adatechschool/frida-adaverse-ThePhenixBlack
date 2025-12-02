// app/api/ada-projects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { student_projects } from "@/db/schema";

export async function GET() {
  const projects = await db
    .select({
      id: student_projects.id,
      name: student_projects.title,
    })
    .from(student_projects);

  return NextResponse.json(projects);
}