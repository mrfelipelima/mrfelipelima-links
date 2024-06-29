import CommentSession from '@/app/blog/components/comments';
import { env } from '@/env';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/ui/breadcrumb';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Home } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { z } from "zod";
import styles from './styles.module.css';

const postsSchema = z.object({
  ID: z.number(),
  title: z.string().transform((title) => cheerio.load(title).text()),
  excerpt: z.string().transform((excerpt) => cheerio.load(excerpt).text()),
  content: z.string(),
  featured_image: z.string(),
  date: z.coerce.date(),
})

type PostPageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function requestPostData(slug: string) {
  const siteId = env.SITE_ID
  const postData = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/slug:${slug}`, {
    next: {
      revalidate: 60 // every 60 seconds
    }
  })

  if(postData.status >= 400) {
    return null
  }

  const response = await postData.json()
  
  const parse = postsSchema.parse(response)

  return parse
}
 
export async function generateMetadata(
  { params }: PostPageProps
): Promise<Metadata | undefined> {
  // read route params
  const postData = await requestPostData(params.slug)

  if (!postData) return

  const { title, date, excerpt: description, featured_image } = postData

  let ogImage = featured_image || `https://www.felipelima.net/og?title=${title}`
 
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date.toISOString(),
      url: `https://www.felipelima.net/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

const fbSDK = `
window.fbAsyncInit = function() {
  FB.init({
    appId      : ${env.FB_APP_ID},
    xfbml      : true,
    version    : 'v20.0'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/pt_BR/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
`

export const revalidate = 900 // every 15 minutes

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const postData = await requestPostData(slug)

  if (!postData) return notFound()

  const { title, date, content } = postData

  const pubDate = dayjs(date).locale('pt-br').format('DD [de] MMMM [de] YYYY')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: fbSDK }}></script>
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
                <BreadcrumbLink href='/blog'>blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {title}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-5xl text-framboesa-500 font-semibold">{title}</h1>
          <time className="text-sm dark:text-framboesa-100 text-framboesa-800">{pubDate}</time>
        </div>
        <article className={styles.article} dangerouslySetInnerHTML={{ __html: content }}></article>
        <CommentSession post={{ slug, title }} />
      </main>
    </>
  )
}
