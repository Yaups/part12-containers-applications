import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postBlog } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/messageReducer'

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    await post(newBlog)

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const post = async (newBlog) => {
    try {
      const verifiedBlog = await blogService.post(newBlog, user.token)
      const blogToAdd = {
        ...verifiedBlog,
        user: { name: user.name, username: user.username },
      }
      dispatch(postBlog(blogToAdd))
      dispatch(
        setNotification(`New blog added: ${verifiedBlog.title}`, 5, false),
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5, true))
    }
  }

  return (
    <div className="container">
      <form className="form">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
              placeholder="Title of blog"
              id="blogForm-title-input"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Author</label>
          <div className="control">
            <input
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
              placeholder="Author of blog"
              id="blogForm-author-input"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">URL</label>
          <div className="control">
            <input
              type="text"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
              placeholder="Link to blog post"
              id="blogForm-url-input"
              className="input"
            />
          </div>
        </div>
        <button
          className="button is-success"
          type="submit"
          onClick={handleBlogSubmit}
          id="blogForm-post-button"
        >
          <span className="icon is-small">
            <i className="fas fa-check"></i>
          </span>
          <span>Add blog</span>
        </button>
      </form>
    </div>
  )
}

export default BlogForm
