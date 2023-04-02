import { useState } from 'react'
import cookie from 'cookie'

export type SessionData = {
  token: string
  email: string
}

export const useSession = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(() => {
    const cookies =
      typeof document !== 'undefined' ? cookie.parse(document.cookie) : {}

    const token = cookies.token || ''
    const email = cookies.email || ''

    if (token && email) {
      console.log('YES')
      return { token, email }
    }

    console.log('NO')
    return null
  })

  console.log('sessionData on client:', sessionData)

  const saveSessionData = (data: SessionData) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.email)
    }
    setSessionData(data)
  }

  const clearSessionData = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear()
    }
    setSessionData(null)
  }

  return {
    sessionData,
    saveSessionData,
    clearSessionData,
  }
}
