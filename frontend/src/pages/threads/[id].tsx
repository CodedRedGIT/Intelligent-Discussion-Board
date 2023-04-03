import React from 'react'
import { NextPage } from 'next'
import { Page } from '@/components/layout/Page'
import { LinkButton } from '@/components/ui/LinkButton'
import { useRouter } from 'next/router'
import useRetrieveClassPosts from '../api/useRetrieveClassPosts'
import { Card } from '@/components/layout/Card'

const Threads: NextPage = () => {
  const { query } = useRouter()
  const classId = query.id as string

  const { loading, posts, error } = useRetrieveClassPosts(classId)

  return (
    <Page title='Threads'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Threads</h1>
        <LinkButton href='/create-post'>Create a Post</LinkButton>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !posts.length && (
        <p className='text-gray-500'>No threads available</p>
      )}
      {!!posts.length && (
        <Card>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {posts.map(post => (
              <div className='bg-white rounded-lg shadow-lg p-6' key={post.id}>
                <h3 className='text-lg font-bold mb-2'>{post.title}</h3>
                <div className='flex justify-between'>
                  <small className='text-gray-500 text-sm'>{post.tag}</small>
                  <small className='text-gray-500 text-sm'>
                    {post.published_date}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Page>
  )
}

export default Threads
