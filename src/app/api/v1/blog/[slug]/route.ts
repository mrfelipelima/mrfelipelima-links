import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

export async function GET(request: NextRequest, { params: { slug } }: { params: { slug: string } }) {
  const siteId = process.env.SITE_ID
  const wpPost = await fetch(`https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/slug:${slug}`)

  if (wpPost.status >= 400) {
    return NextResponse.json({ error: 'post not found' }, { status: 404 })
  }

  const response = await wpPost.json()

  const { ID, content, date, title } = postsSchema.parse(response)

  return NextResponse.json({
    ID, content, date, title
  })
}