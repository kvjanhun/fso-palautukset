const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('When there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs\' unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const comparableBlog = helper.validBlog

    const blogExists = response.body.some(blog =>
      helper.blogsAreEqual(blog, comparableBlog)
    )
    assert.strictEqual(blogExists, true)
  })
})

describe('Adding a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = helper.validBlog

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const newBlogExists = response.body.some(blog =>
      helper.blogsAreEqual(blog, newBlog)
    )
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert.strictEqual(newBlogExists, true)
  })

  test('fails with status code 400 if title is missing', async () => {
    const titlelessBlog = helper.titlelessBlog
    // NOTE! Add check that nothing was added to database.
    await api
      .post('/api/blogs')
      .send(titlelessBlog)
      .expect(400)
  })

  test('fails with status code 400 if url is missing', async () => {
    const urllessBlog = helper.urllessBlog
    // NOTE! Add check that nothing was added to database.
    await api
      .post('/api/blogs')
      .send(urllessBlog)
      .expect(400)
  })

  test('succeeds with likes defaulting to 0 if missing', async () => {
    const newBlog = helper.noLikesBlog
    // console.log(newBlog)
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/')
    const savedBlog = response.body.find(
      blog => blog.title === newBlog.title)
    // console.log(savedBlog)
    assert.strictEqual(savedBlog.likes, 0)
  })
})

describe('Deleting a blog', () => {
  test('succeeds with status code 204 if id valid', async () => {
    const blogsBefore = await api.get('/api/blogs')
    const deletedBlog = blogsBefore.body[0]

    await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204)

    const blogsAfter = await api.get('/api/blogs')

    assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length - 1)

    const deletedBlogExists = blogsAfter.body.some(blog =>
      helper.blogsAreEqual(blog, deletedBlog)
    )

    assert.strictEqual(deletedBlogExists, false)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '12345'
    await api.delete(`/api/blogs/${invalidId}`).expect(400)

    const blogsAfter = await api.get('/api/blogs')
    assert.strictEqual(blogsAfter.body.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})