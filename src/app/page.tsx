import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { Person, WithContext } from 'schema-dts';
import { z } from 'zod';

import { SocialIcons } from '@/components/SocialIcons';

import felipeLima from '@/assets/felipe.jpg';
import LinkButton from '@/components/LinkButton';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

const popins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300'],
  variable: '--font-poppins',
})

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

const linksSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  position: z.number().default(0),
  description: z.string().default(""),
  clicks: z.number().default(0)
}))

type LinksSchema = z.infer<typeof linksSchema>

export const revalidate = 60

export default async function Home() {

  const docRef = doc(db, "configurations", "profile");
  const docSnapshot = await getDoc(docRef);

  const { name, tagline, about } = profileSchema.parse(docSnapshot.data())

  const linksRef = query(collection(db, "links"), where("visibility", "==", true))
  const linksSnapshot = await getDocs(linksRef)

  let links: LinksSchema = []

  linksSnapshot.forEach(doc => {
    links.push({
      id: doc.id,
      title: doc.get("title"),
      url: doc.get("url"),
      clicks: doc.get("clicks"),
      description: doc.get("description"),
      position: doc.get("position"),
    })
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person),
        }}
      />

      <div className="px-6 py-4 flex flex-col gap-6 h-screen items-center justify-center">
        <div className="md:w-1/2 flex flex-col items-center justify-center gap-6">
          <header className="flex flex-col items-center gap-4">
            <Image
              className="h-[12.1875rem] w-[12.1875rem] rounded-full border-4 border-framboesa-500"
              src={felipeLima}
              width="144"
              height="144"
              alt="Foto de Felipe Lima"
            />
            <h1 className={`${popins.className} text-center font-alt text-5xl text-framboesa-500 leading-10`}>
              {name}
            </h1>
            <span className={`text-xl ${popins.className}`}>{tagline}</span>
            <span className="text-center text-base">{about}</span>
          </header>
          <div className="flex flex-col items-center gap-4 w-full">
              {links.map((link) => {
                return (
                  <LinkButton key={link.id} title={link.title} url={link.url} />
                )
              })}
          </div>
          <SocialIcons />
          </div>
      </div>
    </>
  )
}
