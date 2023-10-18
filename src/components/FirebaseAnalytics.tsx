'use client'
import { app } from "@/lib/firebase";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";
import { ReactNode, createContext, useEffect, useState } from 'react';

type AnalyticsContextProps = {
  children: ReactNode
}

type AnalyticsContextType = {
  analyticsSupport: boolean | null
  analytics: Analytics | null
}

const AnalyticsContext = createContext({} as AnalyticsContextType)

export function FirebaseAnalytics({children}: AnalyticsContextProps) {

  const [analyticsSupport, setAnalyticsSupport] = useState<boolean | null>(null)

  async function getAnalyticsSupport() {
    const support = await isSupported()
    setAnalyticsSupport(support)
  }

  useEffect(() => {
    getAnalyticsSupport()
  }, [])

  const analytics = analyticsSupport ? getAnalytics(app) : null

  return(
    <AnalyticsContext.Provider value={{ analyticsSupport, analytics }}>
      {children}
    </AnalyticsContext.Provider>
  )
}