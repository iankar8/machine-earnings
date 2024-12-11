import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { cookies } from 'next/headers'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json')

async function readSubscribers() {
  try {
    const content = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    return []
  }
}

async function writeSubscribers(subscribers: any[]) {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(req: Request) {
  try {
    const { email, subscriptions } = await req.json()
    
    // Format data
    const newSubscriber = {
      timestamp: new Date().toISOString(),
      email,
      subscriptions: {
        weekly: subscriptions.includes('weekly'),
        essays: subscriptions.includes('essays'),
        community: subscriptions.includes('community'),
      }
    }

    // Read existing subscribers
    const subscribers = await readSubscribers()
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === email)
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Add new subscriber
    subscribers.push(newSubscriber)
    
    // Save updated list
    await writeSubscribers(subscribers)

    // Set authentication cookie
    cookies().set('userEmail', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
} 