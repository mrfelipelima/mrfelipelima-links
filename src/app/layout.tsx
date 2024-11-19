import { MainMenu } from '@/components/MainMenu'
import { env } from '@/env'
import { cn } from '@/lib/cn'
import { urlHandler } from '@/lib/url-handler'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import { ReactNode } from 'react'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(urlHandler()),
  title: {
    default: 'Felipe Lima',
    template: '%s | Felipe Lima',
  },
  description:
    'Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.',
  openGraph: {
    title: 'Felipe Lima',
    description:
      'Felipe Lima é engenheiro web com habilidades de backend e frontend e nessa página apresenta os principais links para acompanhar seus trabalhos.',
    url: `${urlHandler()}`,
    siteName: 'Felipe Lima',
    locale: 'pt_BR',
    type: 'website',
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

const fbSDK = `
window.fbAsyncInit = function() {
  FB.init({
    appId      : ${env.FB_APP_ID},
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          poppins.className,
          'bg-zinc-100 font-sans text-indigoDark-900 dark:bg-indigoDark-500 dark:text-framboesa-50',
        )}
      >
        <header className="sticky top-0 z-40 h-auto w-full border-b border-b-indigoDark-100 bg-white/50 p-4 backdrop-blur-sm dark:border-b-indigoDark-700 dark:bg-indigoDark-500/75">
          <div className="relative">
            <MainMenu />
          </div>
        </header>
        {children}
        {env.VERCEL_ENV === 'production' && (
          <GoogleTagManager gtmId={env.GTM_ID} />
        )}
        <Analytics />
        <Script
          id="fbSDK"
          dangerouslySetInnerHTML={{ __html: fbSDK }}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
