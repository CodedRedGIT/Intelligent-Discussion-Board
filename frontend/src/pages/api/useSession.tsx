import { useState } from 'react'

export type SessionData = {
  token: string
  email: string
}

export const useSession = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(() => {
    let token = null
    let email = null

    if (typeof sessionStorage !== 'undefined') {
      token = sessionStorage.getItem('token')
      email = sessionStorage.getItem('email')
    }

    if (token && email) {
      return { token, email }
    }

    return null
  })

  const saveSessionData = (data: SessionData) => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('email', data.email)
    }
    setSessionData(data)
  }

  const clearSessionData = () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear()
    }
    setSessionData(null)
  }

  return {
    sessionData,
    saveSessionData,
    clearSessionData,
  }
}
