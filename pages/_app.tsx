import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: `${process.env.GTM_ID}` })
  }, [])
  return <Component {...pageProps} />
}
