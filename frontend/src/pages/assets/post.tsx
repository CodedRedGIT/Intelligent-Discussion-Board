import React from 'react'
import Navbar from '../../components/layout/Navbar'
import ListReplies from '../../components/ListReplies'
import ReplyForm from '../../components/ReplyForm'
import useRetrievePostInfo from '../api/useRetrievePostInfo'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  postId: string
}

const Post: NextPage<Props> = ({ postId }) => {
  const { post, member, error } = useRetrievePostInfo(postId)
  const isLogged = sessionStorage.getItem('token-id')

  const date = post?.published_date.substring(0, 10)
  const time = post?.published_date.substring(11, 16)

  if (!isLogged) {
    return <Link href='/' />
  }

  return (
    <div>
      <Navbar />
      <div className='thread__container'>
        <div className='thread__item'>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <h3>{post?.title}</h3>
              <div className='thread__prompt'>
                <p>{post?.prompt}</p>
              </div>
              <div className='thread__info'>
                <small>{post?.tag}</small>
                <small>{date} </small>
                <small>{time} </small>
                <small>{member?.user.email}</small>
              </div>
            </>
          )}
        </div>
        <ListReplies postId={postId} />
        <ReplyForm postId={postId} />
      </div>
    </div>
  )
}

export default Post
