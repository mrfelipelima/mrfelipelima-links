import { env } from '@/env'

export function urlHandler() {
  const protocol = env.NODE_ENV === 'production' ? 'https' : 'http'
  const host =
    env.NODE_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : 'localhost:3000'
  const url = `${protocol}://${host}`
  return url
}
