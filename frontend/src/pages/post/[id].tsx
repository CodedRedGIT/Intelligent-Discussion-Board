// this page is still being worked on to work with out new framework. Need to update components.


import React from 'react'
// import ListReplies from '../../components/ListReplies'
// import ReplyForm from '../../components/ReplyForm'
import useRetrievePost from '../api/useRetrievePost'
import { NextPage } from 'next'
import { Card } from '@/components/layout/Card'
import { LinkButton } from '@/components/ui/LinkButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page'

const Post: NextPage = () => {
  const { query } = useRouter()
  const postId = query.id as string

  const { post, member, error } = useRetrievePost(postId)

  const date = post?.published_date.substring(0, 10)
  const time = post?.published_date.substring(11, 16)

  return (
    <Page title={'Post'}>
      <div className='flex flex-col items-center'>
        <div className='w-full lg:w-3/4'>
          <Card>
            <div className='p-4'>
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  <h3 className='text-2xl font-bold text-black mb-2'>
                    {post?.title}
                  </h3>
                  <div className='flex justify-between'>
                    <small className='text-gray-500 text-sm'>{post?.tag}</small>
                    <small className='text-gray-500 text-sm'>
                      {date} {time}
                    </small>
                  </div>
                  <p className='text-gray-500 text-lg mt-4'>{post?.prompt}</p>
                  {/* <ListReplies postId={postId} />
                  <ReplyForm postId={postId} /> */}
                  <div className='flex justify-center mt-8'>
                    <Link href='/threads'>
                      <LinkButton href={''}>Back to Threads</LinkButton>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Page>
  )
}

export default Post
