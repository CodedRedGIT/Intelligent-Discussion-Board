import { useEffect, useState } from 'react'
import cookie from 'cookie'
import { getSessionData, SessionData } from './auth/getSessionData'

export const useSession = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null)

  useEffect(() => {
    const { session_id } = cookie.parse(document.cookie)
    const fetchData = async () => {
      const data = await getSessionData(session_id)
      setSessionData(data)
    }
    fetchData()
  }, [])

  const saveSessionData = (data: SessionData) => {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    document.cookie = `session_id=${
      data.token
    }; expires=${expires.toUTCString()}; path=/;`
    setSessionData(data)
  }

  const clearSessionData = () => {
    document.cookie =
      'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setSessionData(null)
  }

  return {
    sessionData,
    saveSessionData,
    clearSessionData,
  }
}
