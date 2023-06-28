import { Metadata } from 'next'
import { Person, WithContext } from 'schema-dts'

import { Header } from '@/components/Header'
import { LinkList } from '@/components/LinkList'
import { SocialIcons } from '@/components/SocialIcons'

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

export default function Home() {
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
          <Header />
          {/* @ts-expect-error Server Component */}
          <LinkList />
          <SocialIcons />
        </div>
      </div>
    </>
  )
}
