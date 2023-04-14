import React from 'react'

interface Props {
  post: {
    id: number
    prompt: string
    tag: string
    published_date: string
  }
}

const ListItem: React.FC<Props> = ({ post }) => {
  const date = post.published_date.substring(0, 10)
  const time = post.published_date.substring(11, 16)

  return (
    <>
      <h3>{post.prompt}</h3>
      <div className='thread__info'>
        <small>{post.tag}</small>
        <small>{date}</small>
        <small>{time}</small>
      </div>
    </>
  )
}

export default ListItem
