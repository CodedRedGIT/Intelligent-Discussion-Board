import useRetrieveReplies from '@/pages/api/useRetrieveReplies'
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
        {sortedReplies.map(reply => (
          <div className='thread__item'>
            <div
              className='thread__reply'
              dangerouslySetInnerHTML={{ __html: reply.prompt }}
            ></div>
            <div className='thread__info'>
              <div className='thread__info__top'>
                <small>{reply.published_date.substring(0, 10)}</small>
                <small>{reply.published_date.substring(12, 19)}</small>
                <small>{reply.upvotes} upvotes</small>
                <small>{reply.email}</small>
              </div>
              <div className='thread__info__bottom'>
                <FontAwesomeIcon icon={faThumbsUp} className='icon' />
                <FontAwesomeIcon icon={faTrash} className='icon' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListReplies
