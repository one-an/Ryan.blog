import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/lib/file-store";

export async function GET() {
  const about = readJsonFile("about.json", {
    intro: "",
    skills: [],
    experiences: [],
    education: [],
  });
  return NextResponse.json(about);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  writeJsonFile("about.json", body);
  return NextResponse.json({ success: true });
}
