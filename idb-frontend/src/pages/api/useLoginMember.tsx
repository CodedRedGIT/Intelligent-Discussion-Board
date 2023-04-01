import { useState } from 'react'
import axios from 'axios'

interface LoginMemberOptions {
  email: string
  password: string
}

const useLoginMember = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loginMember = async ({ email, password }: LoginMemberOptions) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('/api/login/', {
        email,
        password,
      })

      const memberData = response.data
      sessionStorage.setItem('token-id', memberData.id)
      sessionStorage.setItem('token-email', memberData.user.email)
      // Handle successful login
      // redirect to /dashboard page
      return response.data
    } catch (error: any) {
      setError(error.response.data.error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { loginMember, loading, error }
}

export default useLoginMember
