import React, { useState } from 'react'
import axios from 'axios'

interface Props {
  postId: string
}

const ReplyForm: React.FC<Props> = ({ postId }) => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const tokenInfo = sessionStorage.getItem('token-id')
    console.log(tokenInfo)
    try {
      const response = await axios.post(
        `/api/posts/${postId}/replies/create/`,
        {
          prompt: prompt,
          member_id: tokenInfo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token-id')}`,
          },
        },
      )

      if (response.status === 201) {
        setPrompt('')
        window.location.reload()
      } else {
        console.error('Failed to create reply')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default ReplyForm
