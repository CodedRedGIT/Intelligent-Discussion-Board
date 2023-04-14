import { useState } from 'react'

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const createPost = async (newPost: {
    member_id: string
    prompt: string
    title: string
    tag: string
    class_id: string
  }) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/posts/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

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
    createPost,
  }
}
