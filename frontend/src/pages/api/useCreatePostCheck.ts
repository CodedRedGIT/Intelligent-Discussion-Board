import { useState } from 'react'

export const useCreatePostCheck = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)

  const createPostCheck = async (newPost: {
    member_id: string
    prompt: string
    title: string
    tag: string
    class_id: string
  }) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:8000/api/posts/create/check/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPost),
        },
      )

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      const responseData = await response.json()
      setData(responseData)
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
    data,
    createPostCheck,
  }
}
