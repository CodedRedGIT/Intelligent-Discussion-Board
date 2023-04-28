// this page is still being worked on to work with out new framework. Need to update components.

import React, { useState } from 'react'
import ListReplies from '../../components/ListReplies'
import useRetrievePost from '../api/useRetrievePost'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card } from '../../components/layout/Card'
import { Page } from '../../components/layout/Page'
import { LinkButton } from '../../components/ui/LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import Quill from '@/components/QuillForm'

const Post: NextPage = () => {
  const { query } = useRouter()
  const router = useRouter()
  const postId = query.id as string

  const { post, member, error } = useRetrievePost(postId)

  // const formattedPost = post?.prompt.substring(3, post.prompt.length - 4)

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
                  <p className='text-gray-500 text-lg mt-4'>
                    <div
                      dangerouslySetInnerHTML={{ __html: post?.prompt ?? '' }}
                    ></div>
                  </p>
                  <ListReplies postId={postId} />
                  <Quill post_id={postId} parent_id='' />
                  <div className='flex justify-center mt-8'>
                    <h3 onClick={router.back}>Back to Threads</h3>
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
