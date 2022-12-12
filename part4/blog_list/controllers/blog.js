const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs) 
})

blogRouter.post('/', async (request, response) => {
  const blog_content = request.body
  if (blog_content.title === undefined || blog_content.url === undefined) {
    response.status(400).end()
  } else {
    const blog = blog_content.likes === undefined
      ? new Blog ({...blog_content,
        likes: 0
      })
      : new Blog(blog_content)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter