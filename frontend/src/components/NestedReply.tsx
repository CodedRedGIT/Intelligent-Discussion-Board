import { useSessionContext } from '@/pages/api/auth/session'
import { useCreateNestedReply } from '@/pages/api/useCreatedNestedReply'
import { useCreateReply } from '@/pages/api/useCreateReply'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import React, { useState } from 'react'

interface Props {
  replyId: string
  post_id: string
}

const ReactQuillWrapper = dynamic(() => import('react-quill'), {
  //besure to import dynamically
  ssr: false,
})

const NestedReply: React.FC<Props> = ({ replyId, post_id }) => {
  const [prompt, setPrompt] = useState('')

  const { sessionData } = useSessionContext()
  const member_id = sessionData?.user_id

  const {
    isLoading: replyIsLoading,
    error: replyError,
    success: replySuccess,
    createNestedReply,
  } = useCreateNestedReply()

  const {
    isLoading: isCreating,
    error: createError,
    success,
    createReply,
  } = useCreateReply()

  const handleSubmit = () => {
    createReply({ member_id, prompt, parent_id: replyId, post_id })
    Router.reload()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuillWrapper onChange={setPrompt} />
        <div style={{ textAlign: 'right' }}>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default NestedReply
