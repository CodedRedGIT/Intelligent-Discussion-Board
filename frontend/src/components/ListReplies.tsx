import useRetrieveReplies from '@/pages/api/useRetrieveReplies'
import { useUpvote } from '@/pages/api/useUpvote'
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        {sortedReplies.map(reply => {
          const { isLoading, error, success, upvote, removeUpvote } = useUpvote(
            reply.id,
            'reply',
          )

          const handleUpvote = () => {
            upvote()
          }

          const handleRemoveUpvote = () => {
            removeUpvote()
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
                    <button onClick={handleUpvote} disabled={isLoading}>
                      <FontAwesomeIcon icon={faThumbsUp} className='icon' />
                      {isLoading ? 'Loading...' : `${reply.upvotes} upvotes`}
                    </button>
                  </small>
                  <small>{reply.email}</small>
                </div>
                <div className='thread__info__bottom'>
                  <button onClick={handleRemoveUpvote} disabled={isLoading}>
                    <FontAwesomeIcon icon={faTrash} className='icon' />
                    {isLoading ? 'Loading...' : 'Delete'}
                  </button>
                  {success && <div className='success'>Success!</div>}
                  {error && <div className='error'>{error}</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListReplies
