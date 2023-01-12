const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs) 
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

  const user = await User.findById(request.user.id)

  const blog_content = request.body
  if (blog_content.title === '') {
    return response.status(400).json({
      error: 'Must provide a title'
    })
  } else if (blog_content.url === '') {
    return response.status(400).json({
      error: 'Must provide blog url'
    })
  } else if (blog_content.author === '') {
    return response.status(400).json({
      error: 'Must provide blog author'
    })
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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const tokenUserId = request.user.id

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== tokenUserId.toString()) {
    return response.status(401).json({
      error: 'deletion of blog not authorized'
    })
  }  

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {

  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    {likes: body.likes}, 
    {new: true}
  ).populate('user', { username: 1, name: 1, id: 1})

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter