import React from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import ListItem from '@/components/ListItem'
import useRetrieveAllPosts from '../api/useRetrieveAllPosts'
import { LinkButton } from '@/components/ui/LinkButton'
import { NextPage } from 'next'

const ListPost: NextPage = () => {
  const isLogged = sessionStorage.getItem('token-email')
  const { loading, posts, error } = useRetrieveAllPosts()

  if (!isLogged) {
    return <Navigate to='/' />
  }

  return (
    <div>
      <Navbar />
      <LinkButton href='/create-post'>Create a Post</LinkButton>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className='thread__container'>
        {posts.map(post => (
          <div className='thread__item' key={post.id}>
            <ListItem post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListPost
