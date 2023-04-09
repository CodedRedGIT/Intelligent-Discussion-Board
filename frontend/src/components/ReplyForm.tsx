// TODO needs to be updated with new frontend build
import React, { useState } from 'react'
import axios from 'axios'
import { useCreateReply } from '@/pages/api/useCreateReply'
import { useSessionContext } from '@/pages/api/auth/session'
import Router from 'next/router'

interface Props {
  post_id: string
}

const ReplyForm: React.FC<Props> = ({ post_id }) => {
  const [prompt, setPrompt] = useState('')

  const { sessionData } = useSessionContext()
  const member_id = sessionData?.user_id

  const {
    isLoading: isCreating,
    error: createError,
    success,
    createReply,
  } = useCreateReply()

  const handleSubmit = () => {
    createReply({ member_id, prompt, post_id })
    alert('Reply posted')
    Router.reload()
  }

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   const tokenInfo = sessionStorage.getItem('token-id')
  //   console.log(tokenInfo)
  //   try {
  //     const response = await axios.post(
  //       `/api/posts/${postId}/replies/create/`,
  //       {
  //         prompt: prompt,
  //         member_id: tokenInfo,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${sessionStorage.getItem('token-id')}`,
  //         },
  //       },
  //     )

  //     if (response.status === 201) {
  //       setPrompt('')
  //       window.location.reload()
  //     } else {
  //       console.error('Failed to create reply')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          className='form-group'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <h2>Reply:</h2>
          <span className='inline-block w-4' />
          <div style={{ height: '200px', overflowY: 'scroll', flexGrow: 1 }}>
            {/* <ReactQuill
            value={prompt}
            onChange={setPrompt}
            style={{ height: '100%', width: '100%' }}
          /> */}
            <textarea
              required
              rows={8}
              className='modalInput'
              name='Thread Prompt'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReplyForm
