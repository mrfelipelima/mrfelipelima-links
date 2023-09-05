import { notionApi } from '@/lib/api';
import { Suspense } from 'react';
import { z } from 'zod';

export const revalidate = 60;

const linksSchema = z.object({
  results: z.array(z.object({
    id: z.string(),
    properties: z.object({
      description: z.object({
        rich_text: z.array(z.object({
          text: z.object({
            content: z.string(),
          })
        }))
      }),
      clicks: z.object({
        number: z.number().nullable()
      }),
      title: z.object({
        title: z.array(z.object({
          text: z.object({
            content: z.string()
          })
        }))
      }),
      url: z.object({
        url: z.string().url(),
      }),
      visibility: z.object({
        select: z.object({
          name: z.enum(['on', 'off'])
        })
      }),
      position: z.object({
        number: z.number()
      })
    })
  })).transform(
    results => {
      return results.map(results => {
        return {
          id: results.id,
          title: results.properties.title.title[0].text.content,
          url: results.properties.url.url,
          description: results.properties.description.rich_text[0].text.content,
          clicks: results.properties.clicks.number,
          visibility: results.properties.visibility.select.name,
          position: results.properties.position,
        }
      })
    }
  )
})

export async function LinkList() {
  const databaseId = process.env.NOTION_DATABASE_ID

  const response = await notionApi.post(`/databases/${databaseId}/query`, {
    sorts: [
      {
        property: 'position',
        direction: 'ascending'
      }
    ]
  })

  const { results } = linksSchema.parse(response.data)


  return (
    <div className="my-8 flex flex-col items-center text-center">
      <Suspense fallback={<span>Carregando..</span>}>
        <ul className="flex w-full flex-col gap-4">
          {results.map((link) => {
            if(link.visibility === 'on') {
              return (
                <a href={link.url} key={link.id}>
                  <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
                    {link.title}
                  </li>
                </a>
              )
            }
          })}
        </ul>
      </Suspense>
    </div>
  )
}
