import { useState, useEffect } from 'react'

interface Reply {
  id: string
  prompt: string
  upvotes: number
  published_date: string
  email: string
}

interface Member {
  id: string
  member_type: string
  user: {
    email: string
  }
}

interface useRetrieveRepliesResult {
  replies: Reply[]
  member: Member | undefined
  loading: boolean
  error: string | null
}

const useRetrieveReplies = (
  post_id: string | string[] | undefined,
): useRetrieveRepliesResult => {
  const [replies, setReplies] = useState<Reply[]>([])
  const [member, setMember] = useState<Member>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!post_id) return
    const fetchPosts = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `http://localhost:8000/api/posts/${post_id}/replies/`,
        )
        const data = await response.json()
        setReplies(data)
        setMember(data.member)
      } catch (error) {
        console.log(error)
        setError('Error retrieving replies')
      }

      setLoading(false)
    }

    fetchPosts()
  }, [post_id])

  return { replies, member, loading, error }
}

export default useRetrieveReplies
