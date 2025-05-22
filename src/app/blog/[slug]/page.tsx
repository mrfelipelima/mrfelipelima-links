import CommentSession from '@/app/blog/components/comments'
import dayjs from '@/lib/dayjs'
import { urlHandler } from '@/lib/url-handler'
import { getPost } from '@/lib/wordpressAPI'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Home } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import styles from './styles.module.css'

type PostPageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata | undefined> {
  // read route params
  const { post } = await getPost(params.slug)

  if (!post) return

  const { title, date, excerpt, featured_image } = post

  const urlfyPostTitle = encodeURIComponent(title)

  const ogImage = featured_image || `${urlHandler()}/og?title=${urlfyPostTitle}`

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      siteName: 'Felipe Lima',
      type: 'article',
      publishedTime: date.toISOString(),
      url: `${urlHandler()}/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
      images: [ogImage],
    },
  }
}

export const revalidate = 120 // every 2 minutes

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const { post } = await getPost(slug)
  if (!post) return notFound()

  const { title, date, content } = post
  const pubDate = dayjs(date).format('DD [de] MMMM [de] YYYY')

  return (
    <>
      <main className="container mx-auto max-w-[900px] space-y-4 p-8">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home size={18} />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{title}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-5xl font-semibold text-framboesa-500">{title}</h1>
          <time className="text-sm text-framboesa-800 dark:text-framboesa-100">
            {pubDate}
          </time>
        </div>
        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <CommentSession post={{ slug, title }} />
      </main>
    </>
  )
}
