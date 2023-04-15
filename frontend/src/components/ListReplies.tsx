import useRetrieveReplies from '@/pages/api/useRetrieveReplies'
import { useUpvote } from '@/pages/api/useUpvote'
import {
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDeleteItem } from '@/pages/api/useDeleteItem'

interface ReplyProps {
  reply: any
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
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
        </div>
      </div>
    </div>
  )
}

interface Props {
  postId: string
}

const ListReplies: React.FC<Props> = ({ postId }) => {
  const { replies } = useRetrieveReplies(postId)

  const sortedReplies = [...replies].sort((a, b) => b.upvotes - a.upvotes)

  return (
    <div className='thread__container'>
      <h2>Replies</h2>
      <div className='thread__replies'>
        {sortedReplies.map(reply => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </div>
    </div>
  )
}

export default ListReplies
