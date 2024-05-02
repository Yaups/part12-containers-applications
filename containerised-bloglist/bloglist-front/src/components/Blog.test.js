import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> renders only required content initially', () => {
  const blog = {
    title: 'This is a new blog for the unit test sl2046h3nv02',
    author: 'Author for unit test sl2046h3nv02',
    url: 'www.sl2046h3nv02.com',
    likes: 0,
  }

  const user = {
    name: 'Test Name sl2046h3nv02',
  }

  render(
    <Blog
      blog={blog}
      user={user}
      handleDeletion={() => null}
      handleUpvote={() => null}
    />,
  )

  const titleAndAuthor = screen.getByText(`${blog.title} - ${blog.author}`)
  const likes = screen.queryByText(`Likes: ${blog.likes}`)
  const url = screen.queryByText(blog.url)
  const postedBy = screen.queryByText(`Posted by ${user.name}`)

  expect(titleAndAuthor).toBeDefined()
  expect(likes).toBeNull()
  expect(url).toBeNull()
  expect(postedBy).toBeNull()
})

test('Clicking the like button twice calls its event handler twice', async () => {
  const blog = {
    title: 'This is a new blog for the unit test 387hfhu83',
    author: 'Author for unit test 387hfhu83',
    url: 'www.387hfhu83.com',
    likes: 0,
    user: {
      name: 'Test Name 387hfhu83',
    },
  }

  const user = {
    name: blog.user.name,
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      user={user}
      handleDeletion={() => null}
      handleUpvote={mockHandler}
    />,
  )

  const clicker = userEvent.setup()
  const showButton = screen.getByText('Show')
  await clicker.click(showButton)

  const likeButton = screen.getByText('Like')
  await clicker.click(likeButton)
  await clicker.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
