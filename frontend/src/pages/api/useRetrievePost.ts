import { useState, useEffect } from 'react'

interface Post {
  title: string
  prompt: string
  tag: string
  published_date: string
  member_id: string
}

interface Member {
  id: string
  member_type: string
  user: {
    email: string
  }
}

interface PostResponse {
  post: Post | null
  member: Member | null
  error: string | null
}

const useRetrievePost = (postId: string): PostResponse => {
  const [postInfo, setPostInfo] = useState<PostResponse>({
    post: null,
    member: null,
    error: null,
  })

  useEffect(() => {
    if (!postId) return
    const fetchPostInfo = async () => {
      try {
        const postResponse = await fetch(
          `http://localhost:8000/api/posts/${postId}/`,
        )
        const postData = await postResponse.json()

        const member_id = postData.member_id
        const memberResponse = await fetch(
          `http://localhost:8000/api/members/${member_id}/`,
        )
        const memberData = await memberResponse.json()

        setPostInfo({ post: postData, member: memberData, error: null })
      } catch (error) {
        console.error(error)
        setPostInfo({
          post: null,
          member: null,
          error: 'Failed to retrieve post information',
        })
      }
    }

    fetchPostInfo()
  }, [postId])

  return postInfo
}

export default useRetrievePost
