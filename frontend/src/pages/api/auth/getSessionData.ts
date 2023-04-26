export type SessionData = {
  token: string
  email: string
  user_id: string
}

export const getSessionData = async (
  session_id: string,
): Promise<SessionData | null> => {
  console.log('Session ID:', session_id)

  try {
    const response = await fetch('http://localhost:8000/api/session/', {
      headers: { Authorization: `Bearer ${session_id}` },
    })

    const data = await response.json()

    if (response.ok) {
      return {
        token: data.access_token,
        email: data.email,
        user_id: data.user_id,
      }
    } else {
      return null
    }
  } catch (err: any) {
    console.error(err)
    return null
  }
}
