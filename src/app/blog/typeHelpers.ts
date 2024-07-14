import * as cheerio from 'cheerio'
import { z } from 'zod'

export const postsListSchema = z.object({
  found: z.number(),
  posts: z.array(
    z.object({
      ID: z.number(),
      author: z.object({
        first_name: z.string(),
        last_name: z.string(),
        avatar_URL: z.string().url(),
      }),
      date: z.coerce.date(),
      title: z.string().transform((title) => cheerio.load(title).text()),
      excerpt: z.string().transform((excerpt) => cheerio.load(excerpt).text()),
      categories: z.record(
        z.string(),
        z.object({
          ID: z.number(),
          name: z.string(),
          slug: z.string(),
        }),
      ),
      slug: z.string(),
      post_thumbnail: z
        .object({
          URL: z.string().url(),
          width: z.number(),
          height: z.number(),
        })
        .optional()
        .nullable(),
    }),
  ),
})

const postItem = postsListSchema.shape.posts.element

export type PostListType = z.infer<typeof postsListSchema>
export type PostItemListType = z.infer<typeof postItem>
