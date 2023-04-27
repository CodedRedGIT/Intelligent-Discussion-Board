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
import Quill from '@/components/QuillForm'
import { useSessionContext } from '@/pages/api/auth/session'
import useRetrieveMemberType from '@/pages/api/useMemberType'
import Router from 'next/router'

interface Reply {
  id: string
  prompt: string
  upvotes: number
  published_date: string
  email: string
  parent_reply?: ParentReply
}

interface ParentReply {
  member_email: string
  prompt: string
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

  const { sessionData } = useSessionContext()
  const { memberType } = useRetrieveMemberType(sessionData?.user_id)

  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    success: deleteSuccess,
    deleteItem,
  } = useDeleteItem(reply.id, 'replies')

  const [showUpvoteButton, setShowUpvoteButton] = useState(!success)
  const [upvotes, setUpvotes] = useState(reply.upvotes)
  const [isReplying, setIsReplying] = useState(false)
  const [replies, setReplies] = useState<Reply[]>()

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
    Router.reload()
  }

  const nestedReply = () => {
    return <p>d</p>
  }

  return (
    <div className='thread__item' key={reply.id}>
      <div className='thread__column'>
        <div className='thread__top'>
          {reply.parent_reply?.member_email}
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
            {memberType !== 'STUDENT' && (
              <div className='thread__info__bottom'>
                <button onClick={handleDelete} disabled={deleteIsLoading}>
                  <FontAwesomeIcon icon={faTrash} className='icon' />
                  {deleteIsLoading ? 'Loading...' : 'Delete'}
                </button>
                {deleteSuccess && <div className='success'>Success!</div>}
                {deleteError && <div className='error'>{deleteError}</div>}
                {error && <div className='error'>{error}</div>}
              </div>
            )}
          </div>
        </div>
        <div className='thread__bottom'>
          <div>
            <button
              onClick={() => {
                if (isReplying) setIsReplying(false)
                else setIsReplying(true)
              }}
              className='btn btn-primary'
            >
              Reply
            </button>
          </div>
          {isReplying && <Quill post_id={post_id} parent_id={reply.id} />}
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
  const [isLiked, setLike] = useState<boolean>(false)

  const sortedReplies = [...replies].sort((a, b) => {
    // Sort by published date in ascending order
    return (
      new Date(a.published_date).getTime() -
      new Date(b.published_date).getTime()
    )
  })

  const like = (isLiked: boolean) => {
    if (isLiked) {
      isLiked = false
    } else {
      isLiked = true
    }
  }

  return (
    <div className='thread__container'>
      <h2>Replies</h2>
      <div className='thread__replies'>
        {sortedReplies.map(reply => (
          <Reply key={reply.id} reply={reply} post_id={postId} />
        ))}
      </div>
    </div>
  )
}

export default ListReplies
