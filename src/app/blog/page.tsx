import { env } from "@/env";
import * as cheerio from 'cheerio';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export const revalidate = 900; // every 15 minutes

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

async function requestPostsList() {
  const siteId = env.SITE_ID
  const data = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts`, {
    next: {
      revalidate: 60 // every 60 seconds
    }
  })
  const jsonData = await data.json()

  const posts = postsListSchema.parse(jsonData)

  return posts
}

export default async function BlogPage() {
  try {
    const json = await requestPostsList()

    return (
      <main className="my-4 flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-4 w-full md:w-1/2 px-8">
          <h1 className="text-5xl font-semibold">Blog</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ul className="w-full divide-y p-8 md:w-1/2">
            {json.posts.map((post) => {
              const date = dayjs(post.date)
              return (
                <li
                  key={post.ID}
                  className="mt-4 flex flex-col gap-2 p-2 last:border-0"
                >
                  {post.post_thumbnail && (
                    <Image
                      src={post.post_thumbnail.URL}
                      width={post.post_thumbnail.width}
                      height={post.post_thumbnail.height}
                      alt=""
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                  )}
                  <h2 className="text-3xl text-framboesa-500">
                    <Link
                      href={`/blog/${post.slug}`}
                      prefetch
                      className="hover:underline font-semibold"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time 
                    title={date.format("DD/MM/YYYY")}
                    className="text-sm dark:text-framboesa-100 text-framboesa-800"
                  >
                    {dayjs().to(date)}
                  </time>
                  <p className="text-justify">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar_URL}
                        alt={`Foto do autor ${post.author.first_name}`}
                        width="96"
                        height="96"
                        className="h-8 w-8 rounded-full border border-framboesa-500 object-cover shadow-sm"
                      />
                      <span className="text-sm">{`${post.author.first_name} ${post.author.last_name}`}</span>
                    </div>
                    <Link
                      className="text-framboesa-500 hover:underline"
                      href={`/blog/${post.slug}`}
                    >
                      Continuar lendo
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    );
  } catch (error) {
    console.info(error)
    return (
      <main className="my-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-semibold">Blog</h1>
        <span>Não foi possível carregar as postagens do blog.</span>
      </main>
    );
  }
}
