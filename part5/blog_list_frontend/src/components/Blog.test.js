import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog rendering', () => {

  let container

  beforeEach(() => {

    const blog = {
      user: '6398e01fccbcd218c8984d11',
      likes: 33,
      author: 'Harry Potter',
      title: 'First Blog Render Tests',
      url: 'https://www.google.com/'
    }
    container = render(<Blog blog={blog} />).container
  })

  test('default setting renders blog title and author only', () => {

    screen.debug()

    const titleAuthorElement = screen.getByText('First Blog Render Tests Harry Potter')
    expect(titleAuthorElement).toBeDefined()

    const leanBlog = container.querySelector('.leanBlog')
    expect(leanBlog).toHaveStyle('display: block')

    const completeBlog = container.querySelector('.completeBlog')
    expect(completeBlog).toHaveStyle('display: none')
  })

  test('complete blog info shown when show button is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.viewBlogDetails')
    await user.click(button)

    const leanBlog = container.querySelector('.leanBlog')
    expect(leanBlog).not.toHaveStyle('display: block')

    const completeBlog = container.querySelector('.completeBlog')
    expect(completeBlog).not.toHaveStyle('display: none')
  })
})

