//WHOLE FORM DOESN'T WORK YET. WIP
import { useSessionContext } from '@/pages/api/auth/session'
import { useCreateReply } from '@/pages/api/useCreateReply'
import { useDeleteItem } from '@/pages/api/useDeleteItem'
import { useUpvote } from '@/pages/api/useUpvote'
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface Props {
  parentId: Reply | undefined
  replyId: Reply
  post_id: string
}

interface Reply {
  id: string
  prompt: string
  upvotes: number
  published_date: string
  email: string
  parent_reply?: Reply
  child_replies?: Reply[]
}

interface ReplyProps {
  reply: Reply
  post_id: string
}

const Reply: React.FC<ReplyProps> = ({ reply, post_id }) => {
  const { isLoading, error, success, upvote, removeUpvote } = useUpvote(
    reply.id,
    'replies',
  )

  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    success: deleteSuccess,
    deleteItem,
  } = useDeleteItem(reply.id, 'replies')

  const [showUpvoteButton, setShowUpvoteButton] = useState(!success)
  const [upvotes, setUpvotes] = useState(reply.upvotes)
  const [isReplying, setIsReplying] = useState(false)
  const [prompt, setPrompt] = useState('')

  const handleUpvote = () => {
    upvote()
    setShowUpvoteButton(false)
    setUpvotes(upvotes + 1)
  }

  const handleRemoveUpvote = () => {
    removeUpvote()
    setShowUpvoteButton(true)
    setUpvotes(upvotes - 1)
  }

  const handleDelete = () => {
    deleteItem()
    window.location.reload()
  }

  const nestedReply = () => {
    return <p>d</p>
  }

  return (
    <div className='thread__item' key={reply.id}>
      <div
        className='thread__reply'
        dangerouslySetInnerHTML={{ __html: reply.prompt }}
      ></div>
      <div className='thread__info'>
        <div className='thread__info__top'>
          <small>{reply.published_date.substring(0, 10)}</small>
          <small>{reply.published_date.substring(12, 19)}</small>
          <small>
            {showUpvoteButton && (
              <button onClick={handleUpvote} disabled={isLoading}>
                <FontAwesomeIcon icon={faThumbsUp} className='icon' />
                {isLoading ? 'Loading...' : `${upvotes} upvotes`}
              </button>
            )}
            {!showUpvoteButton && (
              <button onClick={handleRemoveUpvote} disabled={isLoading}>
                <FontAwesomeIcon icon={faThumbsDown} className='icon' />
                {isLoading ? 'Loading...' : `${upvotes} upvotes`}
              </button>
            )}
          </small>
          <small>{reply.email}</small>
        </div>
        <div className='thread__info__bottom'>
          <button onClick={handleDelete} disabled={deleteIsLoading}>
            <FontAwesomeIcon icon={faTrash} className='icon' />
            {deleteIsLoading ? 'Loading...' : 'Delete'}
          </button>
          {deleteSuccess && <div className='success'>Success!</div>}
          {deleteError && <div className='error'>{deleteError}</div>}
          {error && <div className='error'>{error}</div>}
          <div>
            <button
              onClick={() => setIsReplying(true)}
              className='btn btn-primary'
            >
              Reply
            </button>
          </div>
        </div>
        {isReplying && (
          <div style={{ height: '200px', overflowY: 'scroll', flexGrow: 1 }}>
            <form>
              <textarea
                required
                rows={8}
                className='modalInput'
                name='Thread Prompt'
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
      {reply.child_replies && (
        <div className='thread__child-replies'>
          {reply.child_replies.map(childReply => (
            <Reply key={childReply.id} reply={childReply} post_id={post_id} />
          ))}
        </div>
      )}
    </div>
  )
}

const NestedReply: React.FC<Props> = ({ parentId, replyId, post_id }) => {
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
    parentId?.child_replies?.push(replyId)
    window.location.reload()
  }

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
export default NestedReply
