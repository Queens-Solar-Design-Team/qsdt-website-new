import { NextResponse } from "next/server"
import { listProjectsWithDefaults } from "@/lib/content"

export async function GET() {
  return NextResponse.json(await listProjectsWithDefaults())
}
