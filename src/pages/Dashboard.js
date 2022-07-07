import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Post from '../components/Post'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'     
import { getPosts, reset } from '../features/post/postSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const posts = useSelector(state=>state.posts || {})
  console.log(posts)
  const isLoading = useSelector(state => state.isLoading)
  const isError = useSelector(state => state.isError)
  const message = useSelector(state => state.message)
  // const { posts, isLoading, isError, message } = useSelector(
  //   (state) => state.posts || {}
  // )

  useEffect(() => {
    // if (isError) {
    //   console.log(message)
    // }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>User Dashboard</p>
      </section>

      <Post />

      {/* <section className='content'>
        {posts.length > 0 ? (
          <div className='goals'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>You have not set any posts</h3>
        )}
      </section> */}
    </>
  )
}

export default Dashboard