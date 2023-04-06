import useRetrieveReplies from '@/pages/api/useRetrieveReplies'

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
              <small>{reply.published_date}</small>
              <small>{reply.upvotes} upvotes</small>
              <small>{reply.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListReplies
