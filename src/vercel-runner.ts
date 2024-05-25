// Running Hono in Vercel.
import app from '@/index'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

export const GET = handle(app)
export const POST = handle(app)
