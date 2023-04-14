/*
Not used for a specific class but can be used for statistics later on
*/
import { useState, useEffect } from 'react'

interface Post {
  id: number
  prompt: string
  title: string
  tag: string
  published_date: string
}

interface UseRetrieveAllPostsResult {
  posts: Post[]
  loading: boolean
  error: string | null
}

const useRetrieveAllPosts = (): UseRetrieveAllPostsResult => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)

      try {
        const response = await fetch('http://localhost:8000/api/classes/')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        setError('Error retrieving posts')
      }

      setLoading(false)
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

export default useRetrieveAllPosts
