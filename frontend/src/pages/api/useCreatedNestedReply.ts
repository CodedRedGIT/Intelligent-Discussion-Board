import { useState } from 'react'

export const useCreateNestedReply = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const createNestedReply = async (newReply: {
    member_id: string | undefined
    prompt: string
    reply_id: string
  }) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8000/api/replies/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReply),
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
    createNestedReply,
  }
}
