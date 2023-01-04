import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async() => {
  const createNewBlog = jest.fn()
  const user = userEvent.setup()

  render (<NewBlogForm createNewBlog={createNewBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter blog title')
  const authorInput = screen.getByPlaceholderText('Enter blog author')
  const urlInput = screen.getByPlaceholderText('Enter blog URL')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'First Automated New Blog Test')
  await user.type(authorInput, 'Ron Weasley')
  await user.type(urlInput, 'www.google.com')
  await user.click(createButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('First Automated New Blog Test')
  expect(createNewBlog.mock.calls[0][0].author).toBe('Ron Weasley')
  expect(createNewBlog.mock.calls[0][0].url).toBe('www.google.com')
})