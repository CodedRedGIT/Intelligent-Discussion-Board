import React, { useState, useEffect } from 'react'

interface Reply {
  id: number
  prompt: string
  published_date: string
  upvotes: number
  email: string
}

interface Props {
  postId: string
}

const ListReplies: React.FC<Props> = ({ postId }) => {
  const [replies, setReplies] = useState<Reply[]>([])

  useEffect(() => {
    const fetchReplies = async () => {
      const response = await fetch(`/api/posts/${postId}/replies/`)
      const data = await response.json()
      setReplies(data)
    }
    fetchReplies()
  }, [postId])

  const sortedReplies = [...replies].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className='thread__container'>
      <h2>Replies</h2>
      <div className='thread__replies'>
        {sortedReplies.map(reply => (
          <div className='thread__item' key={reply.id}>
            <div
              className='thread__reply'
              dangerouslySetInnerHTML={{ __html: reply.prompt }}
            ></div>
            <div className='thread__info'>
              <small>{reply.published_date}</small>
              <small>{reply.upvotes} upvotes</small>
              <small>{reply.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListReplies
