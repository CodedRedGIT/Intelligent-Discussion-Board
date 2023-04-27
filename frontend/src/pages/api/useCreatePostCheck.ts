import { useState } from 'react'

interface Post {
  id: string
  prompt: string
  title: string
}

interface FileData {
  response_type: 'file_data'
  data: string[]
}

interface PostData {
  response_type: 'post_data'
  data: Post[]
}

type PostResponse = FileData | PostData

export const useCreatePostCheck = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postResponse, setPostResponse] = useState<PostResponse | null>(null)

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

      const responseData: PostResponse = await response.json()
      setPostResponse(responseData)
      setError(null)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    postResponse,
    loading,
    error,
    createPostCheck,
  }
}
