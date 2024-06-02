import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = z.enum(['development', 'production', 'test'])

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
  return (value: any) => {
    if (env === process.env.NODE_ENV && !value) {
      return false
    }

    return true
  }
}

export const env = createEnv({
  server: {
    // Firebase
    FIREBASE_API_KEY: z.string().min(1),
    FIREBASE_AUTH_DOMAIN: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_STORAGE_BUCKET: z.string().min(1),
    FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    FIREBASE_APP_ID: z.string().min(1),
    FIREBASE_MEASUREMENT_ID: z.string().min(1),

    // Google Tag Manager
    GTM_ID: z.string().min(1).refine(requiredOnEnv('production')),

    // Facebook
    FB_APP_ID: z.string().min(1),

    // WordPress
    SITE_ID: z.string().min(1).refine(requiredOnEnv('production')),
  },
  shared: {
    // Vercel environment
    VERCEL_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),

    // Node Env
    NODE_ENV: nodeEnv,
  },
  client: {
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1),

    // Disqs
    NEXT_PUBLIC_DISQS_SHORTNAME: z.string().min(1).refine(requiredOnEnv('production')),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_DISQS_SHORTNAME: process.env.NEXT_PUBLIC_DISQS_SHORTNAME
  },
})