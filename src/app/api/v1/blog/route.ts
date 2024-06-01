import * as cheerio from 'cheerio'
import { NextResponse } from 'next/server'
import { z } from "zod"

const postsListSchema = z.object({
  found: z.number(),
  posts: z.array(z.object({
    ID: z.number(),
    author: z.object({
      first_name: z.string(),
      last_name: z.string(),
      avatar_URL: z.string().url(),
    }),
    date: z.coerce.date(),
    title: z.string().transform((title) => cheerio.load(title).text()),
    excerpt: z.string().transform((excerpt) => cheerio.load(excerpt).text()),
    categories: z.record(z.string(), z.object({
      ID: z.number(),
      name: z.string(),
      slug: z.string(),
    })),
    slug: z.string(),
    post_thumbnail: z.object({
      URL: z.string().url(),
      width: z.number(),
      height: z.number(),
    }).optional().nullable()
  }))
})
export async function GET() {
  const siteId = process.env.SITE_ID
  const data = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts`)
  const jsonData = await data.json()

  const posts = postsListSchema.parse(jsonData)

  return NextResponse.json(posts)
}