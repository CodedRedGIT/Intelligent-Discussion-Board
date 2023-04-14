import { useState } from 'react'

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const register = async (
    email: string,
    password: string,
    password2: string,
  ) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8000/api/members/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, password2 }),
        },
      )

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      setSuccess(true)
      setError(null)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    success,
    register,
  }
}
