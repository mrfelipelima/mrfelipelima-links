import { User } from 'firebase/auth'
import { PropsWithChildren, createContext, useContext } from 'react'

const AuthContext = createContext<User | null>(null)

export async function AppWrapper({ children }: PropsWithChildren) {
  const sharedState = null

  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
