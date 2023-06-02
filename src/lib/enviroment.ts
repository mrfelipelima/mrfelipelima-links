const env = process.env.NODE_ENV !== 'production'
export const server = env
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL
