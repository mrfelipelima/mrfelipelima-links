import { env } from '@/env'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'
import Link from 'next/link'
import { z } from 'zod'

const postSchema = z.object({
  found: z.number(),
  posts: z.array(
    z.object({
      date: z.coerce.date(),
      title: z.string().transform((title) => cheerio.load(title).text()),
      slug: z.string(),
    }),
  ),
})

export async function LastPost() {
  const siteId = env.SITE_ID
  const data = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts?number=1&fields=title,date,slug`,
    { next: { revalidate: 60 } },
  )
  const json = await data.json()

  const { posts } = postSchema.parse(json)

  return (
    <div className="text-center">
      <span title={dayjs(posts[0].date).format('DD/MM/YYYY')}>
        ✨ Última postagem:{' '}
      </span>
      <Link
        href={`/blog/${posts[0].slug}`}
        className="font-bold hover:underline"
      >
        {posts[0].title}
      </Link>
    </div>
  )
}
