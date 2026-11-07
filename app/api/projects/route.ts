import { NextResponse } from "next/server"
import { projects } from "../../../data/projects"
import { listItems } from "@/lib/content"

export async function GET() {
  try {
    const saved: any[] = await listItems("projects")
    const savedIds = new Set(saved.map((p) => p.id))
    const staticOnly = (projects as any[]).filter((p) => !savedIds.has(p.id))
    const all = [...staticOnly, ...saved].sort((a, b) => a.id - b.id)
    return NextResponse.json(all)
  } catch (err) {
    console.error(err)
    return NextResponse.json(projects) // database down? the site still works
  }
}
