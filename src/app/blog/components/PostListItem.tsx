import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { PostItemListType } from '../typeHelpers'

type PostListItemProps = {
  post: PostItemListType
}

export function PostListItem({ post }: PostListItemProps) {
  const date = dayjs(post.date)

  return (
    <li className="mt-4 flex flex-col gap-2 p-2 last:border-0">
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
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <time
        title={date.format('DD[ de ]MMM[ de ]YYYY [às] HH:mm')}
        className="text-sm text-framboesa-800 dark:text-framboesa-100"
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
  )
}
