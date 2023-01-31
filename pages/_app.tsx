import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-TDD4K8T' })
  }, [])
  return <Component {...pageProps} />
}
