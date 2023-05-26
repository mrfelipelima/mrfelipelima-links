import { Metadata } from 'next'
import { Poppins, Roboto_Flex as Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { Person, WithContext } from 'schema-dts'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const popins = Poppins({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Felipe Lima - Link List',
  description:
    'Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.',
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person),
        }}
      />
      <body
        className={`${roboto.variable} ${popins.variable} bg-secondary font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
