import { useState, useEffect } from 'react'

interface Post {
  title: string
  prompt: string
  tag: string
  published_date: string
  member_id: string
}

interface Member {
  user: {
    email: string
  }
}

interface PostInfo {
  post: Post | null
  member: Member | null
  error: string | null
}

const useRetrievePostInfo = (postId: string): PostInfo => {
  const [postInfo, setPostInfo] = useState<PostInfo>({
    post: null,
    member: null,
    error: null,
  })

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${postId}/`)
        const postData = await postResponse.json()

        const member_id = postData.member_id
        const memberResponse = await fetch(`/api/members/${member_id}/`)
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

export default useRetrievePostInfo
