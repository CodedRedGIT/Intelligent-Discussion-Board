import { useState } from 'react'

type ItemType = 'posts' | 'replies'

export const useUpvote = (id: string, type: ItemType) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const upvote = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `http://localhost:8000/api/${type}/${id}/upvote/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

  const removeUpvote = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `http://localhost:8000/api/${type}/${id}/remove_upvote/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
    upvote,
    removeUpvote,
  }
}
