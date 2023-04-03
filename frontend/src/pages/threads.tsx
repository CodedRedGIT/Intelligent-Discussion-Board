import React from 'react'
import { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import useRetrieveClassPosts from './api/useRetrieveClassPosts'
import { LinkButton } from '@/components/ui/LinkButton'
import { useRouter } from 'next/router'

const Threads = () => {
  const router = useRouter()
  const { classId } = router.query

  const { loading, posts, error } = useRetrieveClassPosts(classId)

  return (
    <Page title='Threads'>
      <LinkButton href='/create-post'>Create a Post</LinkButton>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='thread__container'>
        {posts.map(post => (
          <div className='thread__item' key={post.id}>
            <h3>{post.title}</h3>
            <div className='thread__info'>
              <small>{post.tag}</small>
              <small>{post.published_date}</small>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default Threads
