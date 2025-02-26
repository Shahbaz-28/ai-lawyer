import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.DEEPSEEK_API_KEY,
    keyLength: process.env.DEEPSEEK_API_KEY?.length,
    keyPrefix: process.env.DEEPSEEK_API_KEY?.slice(0, 10),
  })
} 