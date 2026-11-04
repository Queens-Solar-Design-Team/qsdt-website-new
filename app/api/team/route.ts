import { NextResponse } from "next/server"
import { team } from "../../../data/team"
import { listItems } from "@/lib/content"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const saved: any[] = await listItems("team")
    const savedIds = new Set(saved.map((p) => p.id))
    const staticOnly = (team as any[]).filter((p) => !savedIds.has(p.id))
    const all = [...staticOnly, ...saved].sort((a, b) => a.id - b.id)
    return NextResponse.json(all)
  } catch (err) {
    console.error(err)
    return NextResponse.json(team) // database down? the site still works
  }
}