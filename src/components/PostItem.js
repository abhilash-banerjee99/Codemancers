import { useDispatch } from 'react-redux'
import { deletePost } from '../features/post/postSlice'

function PostItem({ post }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(post.createdAt).toLocaleString('en-US')}</div>
      <h2>{post.text}</h2>
      <img src={post.gif} alt='' width={50} height={50}/>
      <button onClick={() => dispatch(deletePost(post._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default PostItem