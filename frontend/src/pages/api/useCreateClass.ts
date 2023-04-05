import { useState } from 'react'

export const useCreateClass = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const createClass = async (section: string, memberId: string | undefined) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8000/api/classes/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ section, member_id: memberId }),
        },
      )

      console.log(section)
      console.log(memberId)
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
    createClass,
  }
}
