import { Metadata } from 'next'
import Image from 'next/image'
import { Person, WithContext } from 'schema-dts'
import { z } from 'zod'

import { SocialIcons } from '@/components/SocialIcons'
import { notionApi } from '@/lib/api'

import felipeLima from '@/assets/felipe.jpg'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const metadata: Metadata = {
  openGraph: {
    type: 'profile',
    emails: 'mrfelipelima@gmail.com',
    firstName: 'Felipe',
    lastName: 'Lima',
    siteName: 'Felipe Lima',
    username: 'MrFelipeLima',
  },
}

const person: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felipe Lima',
  email: 'mrfelipelima@gmail.com',
  image:
    'https://firebasestorage.googleapis.com/v0/b/mrfelipelima-409ed.appspot.com/o/public%2Fimg%2F119681655_3876762852339046_5736681282524451695_n%20(1).jpg?alt=media',
  jobTitle: 'Web engineer',
  url: 'https://www.felipelima.net/',
}

const profileSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  about: z.string()
})

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

export const revalidate = 60

export default async function Home() {

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

  const docRef = doc(db, "configurations", "profile");
  const docSnapshot = await getDoc(docRef);

  const { name, tagline, about } = profileSchema.parse(docSnapshot.data())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person),
        }}
      />

      <div className="flex h-screen items-center justify-center">
        <div className="w-5/6 lg:w-1/2">
          <div className="my-8 flex flex-col items-center">
            <Image
              className="h-32 w-32 rounded-full border-4 border-textBase"
              src={felipeLima}
              width="144"
              height="144"
              alt="Foto de Felipe Lima"
            />
            <h1 className="font-titles text-center font-alt text-4xl text-primaryColor">
              {name}
            </h1>
            <span className="text-xl">{tagline}</span>
            <span className="text-center">{about}</span>
          </div>
          <div className="my-8 flex flex-col items-center text-center">
            <ul className="flex w-full flex-col gap-4">
              {results.map((link) => {
                if (link.visibility === 'on') {
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
          </div>
          <SocialIcons />
        </div>
      </div>
    </>
  )
}
