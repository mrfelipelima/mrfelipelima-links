import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Poppins, Roboto_Flex as Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const popins = Poppins({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.felipelima.net'),
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
        <Analytics />
      </body>
    </html>
  )
}
