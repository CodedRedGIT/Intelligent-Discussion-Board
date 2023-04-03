import { useState, useEffect } from 'react'

interface Post {
  id: string
  prompt: string
  title: string
  tag: string
  published_date: string
}

interface useRetrieveClassPostsResult {
  posts: Post[]
  loading: boolean
  error: string | null
}

const useRetrieveClassPosts = (
  class_id: string | string[] | undefined,
): useRetrieveClassPostsResult => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!class_id) return
    const fetchPosts = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `http://localhost:8000/api/classes/${class_id}/posts/`,
        )
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.log(error)
        setError('Error retrieving posts')
      }

      setLoading(false)
    }

    fetchPosts()
  }, [class_id])

  return { posts, loading, error }
}

export default useRetrieveClassPosts
