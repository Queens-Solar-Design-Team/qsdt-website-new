import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // never cache, always fresh

export async function GET() {
  // DEMO DATA: replace with your real source later
  const hourly = [
    { time: '6am', kw: 0.4 }, { time: '8am', kw: 2.1 },
    { time: '10am', kw: 4.6 }, { time: '12pm', kw: 6.2 },
    { time: '2pm', kw: 5.5 }, { time: '4pm', kw: 3.0 },
    { time: '6pm', kw: 0.8 },
  ]

  const todayKwh = hourly.reduce((s, h) => s + h.kw * 2, 0) // ~2h per step
  const currentKw = hourly[hourly.length - 3].kw

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    currentKw,
    todayKwh: Number(todayKwh.toFixed(1)),
    co2AvoidedKg: Number((todayKwh * 0.4).toFixed(1)), // ~0.4 kg CO2 per kWh
    hourly,
  })
}