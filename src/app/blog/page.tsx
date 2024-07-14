import { env } from '@/env'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PostListItem } from './components/PostListItem'
import { postsListSchema } from './typeHelpers'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export const revalidate = 900 // every 15 minutes

async function requestPostsList() {
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
  const posts = postsListSchema.parse(jsonData)
  return posts
}

export default async function BlogPage() {
  try {
    const json = await requestPostsList()

    return (
      <main className="my-4 flex flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-4 px-8 md:w-1/2">
          <h1 className="text-5xl font-semibold">Blog</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ul className="w-full divide-y p-8 md:w-1/2">
            {json.posts.map((post) => {
              return <PostListItem key={post.ID} post={post} />
            })}
          </ul>
        </div>
      </main>
    )
  } catch (error) {
    console.info(error)
    return (
      <main className="my-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-semibold">Blog</h1>
        <span>Não foi possível carregar as postagens do blog.</span>
      </main>
    )
  }
}
