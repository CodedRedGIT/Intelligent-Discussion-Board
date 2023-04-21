import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCreatePost } from '@/pages/api/useCreatePost'
import { Page } from '../../../components/layout/Page'
import { Card } from '../../../components/layout/Card'
import { useSessionContext } from '@/pages/api/auth/session'
import { useCreatePostCheck } from '@/pages/api/useCreatePostCheck'
import useRetrievePost from '@/pages/api/useRetrievePost'
import Link from 'next/link'

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

const CreatePost: NextPage = () => {
  const router = useRouter()
  const { sessionData } = useSessionContext()
  const { query } = useRouter()
  const class_id = query.id as string
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [tag, setTag] = useState('MISC')
  const [showPopup, setShowPopup] = useState(false)
  const { posts, createPostCheck } = useCreatePostCheck()
  const member_id = sessionData?.user_id ?? ''
  const [createPostCheckFinished, setCreatePostCheckFinished] = useState(false)

  const {
    isLoading: isCreating,
    error: createError,
    success,
    createPost,
  } = useCreatePost()

  useEffect(() => {
    if (createPostCheckFinished) {
      if (posts.length === 0) {
        createPost({ member_id, prompt, title, tag, class_id })
        router.push(`/threads/${class_id}`)
        window.location.reload()
      } else {
        console.log(posts)
        setShowPopup(true)
      }
    }
  }, [
    createPostCheckFinished,
    posts,
    member_id,
    prompt,
    title,
    tag,
    class_id,
    router,
  ])

  const handleCreatePostCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent the default form submission behavior
    await createPostCheck({ member_id, prompt, title, tag, class_id })
    setCreatePostCheckFinished(true)
  }

  const handleCreatePost = () => {
    createPost({ member_id, prompt, title, tag, class_id })
    setShowPopup(false)
    router.push(`/threads/${class_id}`)
  }

  const printPosts = (posts: string[]) => {
    let similarPosts: PostResponse[] = []
    for (let i = 0; i < posts.length; i++) {
      let response = useRetrievePost(posts[i])
      similarPosts.push(response)
    }
    return similarPosts
  }

  return (
    <Page title='CreatePost'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Create Post</h1>
      </div>
      {showPopup && (
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='fixed inset-0 bg-gray-500 opacity-50'></div>
            <div className='relative bg-white rounded-lg'>
              <div className='p-4'>
                <h3 className='text-xl font-bold mb-2'>Post Already Exists</h3>
                <p className='mb-2'>
                  A post with the similar prompt already exists in this class.
                </p>
                <p className='mb-4'>
                  Click "Post anyways" to create a new post with the same title
                  and prompt.
                </p>
                <div className='grid'>
                  {posts.map(post => (
                    <Link href={`/post/${post.id}`} replace>
                      {post.title}
                    </Link>
                  ))}
                </div>
                <div className='flex justify-between'>
                  <button
                    className='text-sm text-gray-500 font-medium'
                    onClick={() => {
                      setShowPopup(false)
                      setCreatePostCheckFinished(false)
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className='text-sm text-white bg-green-500 px-4 py-2 rounded-md font-medium'
                    onClick={handleCreatePost}
                  >
                    Post anyways
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {createError && <p className='text-red-500'>{createError}</p>}
      {isCreating && <p>Loading...</p>}
      <div>
        <Card>
          <form className='homeForm' onSubmit={handleCreatePostCheck}>
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
                <option value='MISC'>MISC</option>
                <option value='SYLLABUS'>SYLLABUS</option>
                <option value='HW'>HW</option>
                <option value='EXAM'>EXAM</option>
              </select>
              <button className='homeBtn'>Submit</button>
            </div>
          </form>
        </Card>
      </div>
    </Page>
  )
}

export default CreatePost
