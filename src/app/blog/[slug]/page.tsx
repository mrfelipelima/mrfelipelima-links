import CommentSession from '@/app/blog/components/comments';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { z } from "zod";
import styles from './styles.module.css';

const postsSchema = z.object({
  ID: z.number(),
  title: z.string(),
  content: z.string(),
  date: z.coerce.date(),
}).transform((data) => {
  const title = cheerio.load(data.title).text()
  return {
    ...data,
    title,
  }
})

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
  const fetchURL = process.env.VERCEL_URL || 'http://localhost:3000'
  const post = await fetch(`https://${fetchURL}/api/v1/blog/${slug}`)

  if (post.status >= 400) notFound()

  const response = await post.json()
 
  return {
    title: response.title,
  }
}

const fbSDK = `
window.fbAsyncInit = function() {
  FB.init({
    appId      : ${process.env.FB_APP_ID},
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

export default async function PostPage({ params: { slug } }: { params: { slug: string} }) {
  const fetchURL = process.env.VERCEL_URL || 'http://localhost:3000'
  const post = await fetch(`https://${fetchURL}/api/v1/blog/${slug}`)
  const response = await post.json()
  
  const { content, title, date } = postsSchema.parse(response)

  const pubDate = dayjs(date).locale('pt-br').format('DD [de] MMMM [de] YYYY')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: fbSDK }}></script>
      <main className="container mx-auto max-w-[900px] space-y-4 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl">{title}</h1>
          <time>{pubDate}</time>
        </div>
        <article className={styles.article} dangerouslySetInnerHTML={{ __html: content }}></article>
        <CommentSession post={{ slug, title }} />
      </main>
    </>
  )
}