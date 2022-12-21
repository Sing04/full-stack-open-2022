import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author only', () => {
  const blog = {
    user: '6398e01fccbcd218c8984d11',
    likes: 33,
    author: 'Harry Potter',
    title: 'First Blog Render Tests',
    url: 'https://www.google.com/'
  }

  const container = render(<Blog blog={blog} />).container

  screen.debug()

  const titleAuthorElement = screen.getByText('First Blog Render Tests Harry Potter')
  expect(titleAuthorElement).toBeDefined()

  const leanBlog = container.querySelector('.leanBlog')
  expect(leanBlog).toHaveStyle('display: block')

  const completeBlog = container.querySelector('.completeBlog')
  expect(completeBlog).toHaveStyle('display: none')
})