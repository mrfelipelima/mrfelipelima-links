import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 900 // every 15 minutes

export default async function BlogPage() {
  const fetchURL = process.env.VERCEL_URL || 'http://localhost:3000'
  const blogPosts = await fetch(`${fetchURL}/api/v1/blog`)
  const json = await blogPosts.json()
  return (
    <main className="flex flex-col items-center justify-center gap-4 my-4">
      <h1 className="text-5xl font-semibold">Blog</h1>
      <ul className="p-8 w-full md:w-1/2 divide-y">
        {
          json.posts.map((post: any) => {
            return (
              <li key={post.ID} className="flex flex-col gap-2 mt-4 p-2 last:border-0">
                {
                  post.post_thumbnail && 
                  <Image
                  src={post.post_thumbnail.URL}
                  width={post.post_thumbnail.width}
                  height={post.post_thumbnail.height}
                  alt=""
                  className="aspect-video object-cover w-full max-w-[520px] rounded-lg"
                  />
                }
                <h2 className="text-3xl text-framboesa-500">
                  <Link href={`/blog/${post.slug}`} prefetch className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <time>{dayjs(post.date).format('DD/MM/YYYY')}</time>
                <p className="text-justify">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.avatar_URL}
                      alt={`Foto do autor ${post.author.first_name}`}
                      width="96" height="96"
                      className="w-8 h-8 object-cover rounded-full border border-framboesa-500"
                    />
                    <span>{`${post.author.first_name} ${post.author.last_name}`}</span>
                  </div>
                  <Link className="text-framboesa-500 hover:underline" href={`/blog/${post.slug}`}>Continuar lendo</Link>
                </div>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}