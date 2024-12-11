import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Clear the authentication cookie
  cookies().delete('userEmail')
  
  return NextResponse.json({ success: true })
} 