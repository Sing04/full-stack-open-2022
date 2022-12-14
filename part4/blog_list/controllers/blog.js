const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs) 
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog_content = request.body
  if (blog_content.title === undefined || blog_content.url === undefined) {
    response.status(400).end()
  } else {
    const blog = blog_content.likes === undefined
      ? new Blog ({...blog_content,
        likes: 0,
        user: user._id
      })
      : new Blog({...blog_content,
        user: user._id
      })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  
  const body = request.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {likes: body.likes},
    {new: true}
  )

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter