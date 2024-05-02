import { useEffect } from 'react'
import Message from './components/Message'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import NavBar from './components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import usersService from './services/users'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

const App = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    const getUsers = async () => {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
    }
    getUsers()
  }, [dispatch])

  useEffect(() => {
    const existingUser = JSON.parse(window.localStorage.getItem('user'))
    if (existingUser) {
      dispatch(setUser(existingUser))
    }
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const matchingUser =
    userMatch && users
      ? users.find((user) => user.id === userMatch.params.id)
      : null

  const blogMatch = useMatch('/blogs/:id')
  const matchingBlog =
    blogMatch && blogs
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null

  return (
    <div className="container">
      <NavBar />

      <Message />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<UsersInfo />} />
        <Route
          path="/users/:id"
          element={<UserInfo matchingUser={matchingUser} />}
        />
        <Route path="/blogs/:id" element={<Blog blog={matchingBlog} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
