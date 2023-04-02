import { useState } from 'react'
import { useSession } from './useSession'
import { useRouter } from 'next/router'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { saveSessionData } = useSession()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        saveSessionData({ token: data.token, email })
        router.push('/dashboard')
      } else {
        setError(data.error)
        alert('Invalid Credentials')
      }
    } catch (err: any) {
      setError(err.message)
      alert('Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}

export default useLogin
