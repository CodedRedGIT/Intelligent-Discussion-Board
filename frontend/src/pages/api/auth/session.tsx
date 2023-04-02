import { createContext, useContext } from 'react'
import { useSession, SessionData } from '@/pages/api/useSession'

type SessionContextData = {
  sessionData: SessionData | null
  saveSessionData: (data: SessionData) => void
  clearSessionData: () => void
}

const SessionContext = createContext<SessionContextData>({
  sessionData: null,
  saveSessionData: () => {},
  clearSessionData: () => {},
})

export const useSessionContext = () => {
  return useContext(SessionContext)
}

type SessionProviderProps = {
  children: React.ReactNode
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { sessionData, saveSessionData, clearSessionData } = useSession()

  const value: SessionContextData = {
    sessionData,
    saveSessionData,
    clearSessionData,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
