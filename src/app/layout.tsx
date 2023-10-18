import { FirebaseAnalytics } from '@/components/FirebaseAnalytics';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.felipelima.net'),
  title: {
    default: 'Felipe Lima',
    template: '%s | Felipe Lima'
  },
  description:
    'Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.',
  openGraph: {
    title: 'Felipe Lima',
    description:
    'Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.',
    url: 'https://www.felipelima.net',
    siteName: 'Felipe Lima',
    locale: 'pt_BR',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Felipe Lima',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} bg-framboesa-50 dark:bg-indigoDark-500 font-sans text-indigoDark-900 dark:text-framboesa-50`}
      >
        <FirebaseAnalytics>
          {children}
        </FirebaseAnalytics>
        <Analytics />
      </body>
    </html>
  )
}
