import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useRetrieveClassPosts from '@/pages/api/useRetrieveClassPosts'
import { useCreatePost } from '@/pages/api/useCreatePost'
import Link from 'next/link'
import { Page } from '../../../components/layout/Page'
import { LinkButton } from '../../../components/ui/LinkButton'
import { Card } from '../../../components/layout/Card'
import { useSessionContext } from '@/pages/api/auth/session'

const CreatePost: NextPage = () => {
  const { sessionData } = useSessionContext()
  const { query } = useRouter()
  const class_id = query.id as string
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [tag, setTag] = useState('SYLLABUS')

  const {
    isLoading: isCreating,
    error: createError,
    success,
    createPost,
  } = useCreatePost()

  const member_id = sessionData?.user_id ?? ''

  const handleCreatePost = () => {
    createPost({ member_id, prompt, title, tag, class_id })
    console.log(member_id)
    console.log(prompt)
    console.log(title)
    console.log(tag)
    alert('Thread Posted') //run text processing
  }
  // const { loading, posts, error } = useRetrieveClassPosts(classId)

  return (
    <Page title='CreatePost'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Create Post</h1>
      </div>
      {createError && <p className='text-red-500'>{createError}</p>}
      {isCreating && <p>Loading...</p>}
      <div>
        <Card>
          <form className='homeForm' onSubmit={handleCreatePost}>
            <div className='home__container'>
              <h3 style={{ marginBottom: 3 }}>Thread Prompt</h3>
              <input
                required
                className='modalInput'
                type='text'
                name='Thread Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <h4 style={{ marginBottom: 3 }}>Description</h4>
              <textarea
                required
                rows={8}
                className='modalInput'
                name='Thread Prompt'
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <h4 style={{ marginBottom: 3 }}>Tag</h4>
              <select
                className='dropdown'
                onChange={e => {
                  setTag(e.target.value)
                }}
                value={tag}
              >
                <option value='SYLLABUS'>SYLLABUS</option>
                <option value='HW'>HW</option>
                <option value='EXAM'>EXAM</option>
                <option value='MISC'>MISC</option>
              </select>
              <button className='homeBtn'>Submit</button>
            </div>
          </form>
        </Card>
      </div>
      {/* {!isCreating && !posts.length && (
        <p className='text-gray-500'>No threads available</p>
      )} */}
      {/* {!!posts.length && (
        <>
          <span className='inline-block w-4' />
          {posts.map(post => (
            <Link href={`/post/${post.id}`} key={post.id} passHref>
              <div>
                <Card>
                  <div className='p-4'>
                    <div>
                      <h3 className='text-2xl font-bold text-black mb-2'>
                        {post.title}
                      </h3>
                      <div className='flex justify-between'>
                        <small className='text-gray-500 text-sm'>
                          {post.tag}
                        </small>
                        <small className='text-gray-500 text-sm'>
                          {post.published_date}
                        </small>
                      </div>
                      <p className='text-gray-500 text-lg mt-4'>
                        {post.prompt.slice(0, 150)}...
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </>
      )} */}
    </Page>
  )
}

export default CreatePost
