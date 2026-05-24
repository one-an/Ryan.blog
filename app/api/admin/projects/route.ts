import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";
import { Project } from "@/lib/types";

export async function GET() {
  const projects = readJsonFile<Project[]>("projects.json", []);
  return NextResponse.json(projects);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected array" }, { status: 400 });
  }
  writeJsonFile("projects.json", body);
  return NextResponse.json({ success: true });
}
