import React, { useState } from 'react'
import { NextPage } from 'next'
import { Page } from '../../components/layout/Page'

const CreateThread: NextPage = () => {
  const [threadPrompt, setThreadPrompt] = useState('')
  const [threadBody, setThreadBody] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setThreadPrompt('')
    setThreadBody('')
    alert('Thread Created')
  }
  return (
    <Page title='Create thread'>
      <div>
        <form className='homeForm' onSubmit={handleSubmit}>
          <div className='home__container'>
            <h3 style={{ marginBottom: 3 }}>Thread Title</h3>
            <input
              required
              className='modalInput'
              type='text'
              name='threadPrompt'
              value={threadPrompt}
              onChange={e => setThreadPrompt(e.target.value)}
            />
            <h4 style={{ marginBottom: 3 }}>Description</h4>
            <textarea
              required
              rows={8}
              className='modalInput'
              name='threadBody'
              value={threadBody}
              onChange={e => setThreadBody(e.target.value)}
            />
            <button className='loginBtn'>Submit</button>
          </div>
        </form>
      </div>
    </Page>
  )
}
export default CreateThread
