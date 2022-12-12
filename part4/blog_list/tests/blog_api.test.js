const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('initial set up of the app with blogs', () => {

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier of blogs named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(
      'Best Practices for Writing a Blog'
    )
  })
})

describe('adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'How to add a new blog',
      author: 'Hermione Granger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'How to add a new blog'
    )
  })

  test('adding a blog with no likes defaults the likes property to the value 0', async () => {
    const newBlog = {
      title: 'Adding a blog with no likes',
      author: 'Hermione Granger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

  })
})

describe ('Error handling when adding a new blog', () => {
  test('adding a blog without a title returns 400', async () => {
    const newBlog = {
      author: 'Severus Snape',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  
  test('adding a blog without a url returns 400', async () => {
    const newBlog = {
      title: 'Adding a blog without a url',
      author: 'Albus Dumbledore',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('adding a blog without a title or url returns 400', async () => {
    const newBlog = {
      author: 'Dobey',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }) 
})

describe('deletion of a blog', () => {
  test('successfully deletes blog with valid id, returns 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
})

describe('updating the amount of likes for a specific blog', () => {
  test('successfully updates the amount of likes for a specific blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: 111
    }

    const response = await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    expect(response.body.likes).toBe(111)
  })
})

afterAll(() => {
  mongoose.connection.close()
})