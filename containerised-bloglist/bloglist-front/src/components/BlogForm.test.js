import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> renders correct content', async () => {
  render(<BlogForm />)

  const titleInput = screen.getByPlaceholderText('Title of blog')
  expect(titleInput).toBeDefined()

  const authorInput = screen.getByPlaceholderText('Author of blog')
  expect(authorInput).toBeDefined()

  const urlInput = screen.getByPlaceholderText('Link to blog post')
  expect(urlInput).toBeDefined()

  const postBlogButton = screen.getByText('Add blog')
  expect(postBlogButton).toBeDefined()
})
