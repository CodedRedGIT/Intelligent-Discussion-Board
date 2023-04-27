import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { useCreateReply } from '@/pages/api/useCreateReply'
import { useSessionContext } from '@/pages/api/auth/session'
import 'suneditor/dist/css/suneditor.min.css'

interface Props {
  post_id: string
  parent_id: string
}

const Quill: React.FC<Props> = ({ post_id, parent_id }) => {
  const [prompt, setPrompt] = useState('')
  const { sessionData } = useSessionContext()
  const member_id = sessionData?.user_id
  const {
    isLoading: isCreating,
    error: createError,
    success,
    createReply,
  } = useCreateReply()

  const handleChange = (e: string) => {
    setPrompt(e)
  }

  const handleSubmit = () => {
    createReply({ member_id, prompt, parent_id, post_id })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill onChange={setPrompt} />
        <div style={{ textAlign: 'right' }}>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Quill
