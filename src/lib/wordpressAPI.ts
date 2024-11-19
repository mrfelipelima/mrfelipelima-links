import { postsListSchema } from '@/app/blog/typeHelpers'
import { env } from '@/env'
import * as cheerio from 'cheerio'
import { z } from 'zod'

const postsSchema = z.object({
  ID: z.number(),
  title: z.string().transform((title) => cheerio.load(title).text()),
  excerpt: z.string().transform((excerpt) => cheerio.load(excerpt).text()),
  content: z.string(),
  featured_image: z.string(),
  date: z.coerce.date(),
})

export async function getPost(slug: string) {
  const siteId = env.SITE_ID
  const postData = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/slug:${slug}`,
    {
      next: {
        revalidate: 60, // every 60 seconds
      },
    },
  )

  if (postData.status >= 400) {
    return { post: null }
  }

  const response = await postData.json()

  const post = postsSchema.parse(response)

  return { post }
}

export async function fetchPostsList() {
  const siteId = env.SITE_ID
  const data = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts`,
    {
      next: {
        revalidate: 60, // every 60 seconds
      },
    },
  )
  const jsonData = await data.json()
  const postList = postsListSchema.parse(jsonData)
  return { postList }
}
