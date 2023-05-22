import { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

import { Poppins, Roboto_Flex as Roboto } from 'next/font/google'

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
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${popins.variable} bg-secondary font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
