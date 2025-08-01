const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'A blog about Node.js',
    author: 'A. Nerd',
    url: 'https://erez.ac',
    likes: 3
  },
  {
    title: 'Blog about testing',
    author: 'Test Author',
    url: 'https://url.test/1',
    likes: 0
  },
  {
    title: 'Blog about blogging',
    author: 'Test Author',
    url: 'https://url.test/2',
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

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
  const newBlog = {
    title: 'Importance of regression testing',
    author: 'A. Smartman',
    url: 'https://www.com/important_blog.php',
    likes: 69
  }

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
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert.strictEqual(newBlogExists, true)
})

test('blogs\' likes default to 0', async () => {
  const newBlog = {
    title: 'Nobody likes this blog',
    author: 'Someone Unimportant',
    url: 'https://worst.blog.ever'
  }
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
  const titlelessBlog = {
    author: 'Test Author',
    url: 'Has Url',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .expect(400)
})

test('blog\'s missing url returns 400', async () => {
  const urllessBlog = {
    title: 'Has Title',
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(urllessBlog)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})