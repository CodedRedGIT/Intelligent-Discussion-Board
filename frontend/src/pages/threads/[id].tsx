import React from 'react'
import { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import useRetrieveClassPosts from '../api/useRetrieveClassPosts'
import Link from 'next/link'
import { Page } from '../../components/layout/Page'
import { LinkButton } from '../../components/ui/LinkButton'
import { Card } from '../../components/layout/Card'
import { useSessionContext } from '../api/auth/session'
import useRetrieveMemberType from '../api/useMemberType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDeleteItem } from '../api/useDeleteItem'

interface Post {
  id: string
  prompt: string
  published_date: string
  tag: string
  title: string
}
interface PostProps {
  post: Post
}
const Posts: React.FC<PostProps> = ({ post }) => {
  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    success: deleteSuccess,
    deleteItem,
  } = useDeleteItem(post.id, 'posts')

  const handleDelete = () => {
    deleteItem()
    Router.back()
  }
  const { sessionData } = useSessionContext()
  const { memberType } = useRetrieveMemberType(sessionData?.user_id)
  return (
    <div>
      <Link href={`/post/${post.id}`} key={post.id} passHref>
        <div>
          <Card>
            <div className='p-4'>
              <div>
                <h3 className='text-2xl font-bold text-black mb-2'>
                  {post.title}
                </h3>
                <div className='flex justify-between'>
                  <small className='text-gray-500 text-sm'>{post.tag}</small>
                  <small className='text-gray-500 text-sm'>
                    {post.published_date.substring(0, 10)}
                    <br />
                    {post.published_date.substring(11, 19)}
                    <br />
                    <div>
                      {memberType !== 'STUDENT' && (
                        <button
                          onClick={handleDelete}
                          disabled={deleteIsLoading}
                        >
                          <FontAwesomeIcon icon={faTrash} className='icon' />
                          {deleteIsLoading ? 'Loading...' : 'Delete'}
                        </button>
                        // {deleteSuccess && <div className='success'>Success!</div>}
                        // {deleteError && <div className='error'>{deleteError}</div>}
                        // )}
                      )}
                    </div>
                  </small>
                </div>
                <p className='text-gray-500 text-lg mt-4'>
                  {post.prompt.slice(0, 150)}
                  ...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Link>
      <span className='inline-block w-4' />
    </div>
  )
}

const Threads: NextPage = () => {
  const { query } = useRouter()
  const classId = query.id as string

  const { loading, posts, error } = useRetrieveClassPosts(classId)

  return (
    <Page title='Threads'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Threads</h1>
        <LinkButton href={`create-post/${classId}`}>Create a Post</LinkButton>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !posts.length && (
        <p className='text-gray-500'>No threads available</p>
      )}
      {!!posts.length && (
        <>
          <span className='inline-block w-4' />
          {posts.map(post => (
            <div key={post.id}>
              <Posts post={post} />
            </div>
          ))}
        </>
      )}
    </Page>
  )
}

export default Threads
