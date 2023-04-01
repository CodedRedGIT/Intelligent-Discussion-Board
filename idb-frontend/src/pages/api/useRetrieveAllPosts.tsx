import { useState, useEffect } from 'react'
import axios from 'axios'

interface Post {
  id: number
  prompt: string
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
        const response = await axios.get('/api/posts/')
        setPosts(response.data)
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
