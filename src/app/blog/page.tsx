import { fetchPostsList } from '@/lib/wordpressAPI'
import { PostListItem } from './components/PostListItem'

export const revalidate = 900 // every 15 minutes

export default async function BlogPage() {
  try {
    const { postList } = await fetchPostsList()

    return (
      <main className="my-4 flex flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-4 px-8 md:w-1/2">
          <h1 className="text-5xl font-semibold">Blog</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ul className="w-full divide-y divide-framboesa-100 p-8 dark:divide-indigoDark-700 md:w-1/2">
            {postList.posts.map((post) => {
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
