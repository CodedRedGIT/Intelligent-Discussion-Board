import { useState } from 'react'

interface Post {
  id: number
  prompt: string
  title: string
}

export const useCreatePostCheck = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  const createPostCheck = async (newPost: {
    member_id: string
    prompt: string
    title: string
    tag: string
    class_id: string
  }) => {
    setLoading(true)

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
      const processedPosts = responseData.map((item: any) => ({
        id: item.post_id,
        prompt: item.prompt,
        title: item.title,
      }))
      setPosts(processedPosts)
      setError(null)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    posts,
    loading,
    error,
    createPostCheck,
  }
}
