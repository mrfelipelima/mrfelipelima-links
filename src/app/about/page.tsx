import { env } from '@/env'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import { Home } from 'lucide-react'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import styles from './styles.module.css'

const pageDataSchema = z.object({
  ID: z.number(),
  site_ID: z.number(),
  date: z.coerce.date(),
  modified: z.coerce.date(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  slug: z.string(),
  status: z.string(),
})

async function requestPageData() {
  const siteId = env.SITE_ID
  const postData = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/1`,
    {
      next: {
        revalidate: 60, // every 60 seconds
      },
    },
  )

  if (postData.status >= 400) {
    return null
  }

  const response = await postData.json()

  const parse = pageDataSchema.parse(response)

  return parse
}

export default async function AboutPage() {
  const pageData = await requestPageData()

  if (!pageData) {
    return notFound()
  }

  const { content, title } = pageData

  return (
    <main className="container mx-auto max-w-[900px] space-y-4 p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home size={18} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{title}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-5xl font-semibold text-framboesa-500">{title}</h1>
      <article
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  )
}
