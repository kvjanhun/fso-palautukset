const { test, after, beforeEach } = require('node:test')
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

  // const blogObjects = initialBlogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 3)
})

test('blogs\' unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    // console.log(`Checking title '${blog.title}'`)
    assert.ok(blog.id)
    // console.log(` blog.id has value '${blog.id}'`)
    assert.strictEqual(blog._id, undefined)
    // console.log(` blog._id is ${blog._id}`)
    // console.log('---')
  })
})

test('a valid blog can be added', async () => {
  const newBlog = helper.validBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const newBlogExists = response.body.some(blog =>
    blog.title === newBlog.title &&
    blog.author === newBlog.author &&
    blog.url === newBlog.url &&
    blog.likes === newBlog.likes
  )
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(newBlogExists, true)
})

test('blogs\' likes default to 0', async () => {
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

test('blog\'s missing title returns 400', async () => {
  const titlelessBlog = helper.titlelessBlog
  // NOTE! Add check that nothing was added to database.
  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .expect(400)
})

test('blog\'s missing url returns 400', async () => {
  const urllessBlog = helper.urllessBlog
  // NOTE! Add check that nothing was added to database.
  await api
    .post('/api/blogs')
    .send(urllessBlog)
    .expect(400)
})

test('blog deletion succeeds with status code 204 if id valid', async () => {
  const blogsBefore = await api.get('/api/blogs')
  // console.log('blogsBefore:', blogsBefore.body)
  const deletedBlog = blogsBefore.body[0]
  // console.log('deletedBlog:', deletedBlog)

  await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204)

  const blogsAfter = await api.get('/api/blogs')
  // console.log('blogsAfter:', blogsAfter.body)
  assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length - 1)

  const deletedBlogExists = blogsAfter.body.some(blog =>
    helper.blogsAreEqual(blog, deletedBlog)
  )
  // console.log('deletedBlogExists:', deletedBlogExists)
  assert.strictEqual(deletedBlogExists, false)
})

after(async () => {
  await mongoose.connection.close()
})