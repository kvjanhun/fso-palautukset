const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (!deletedBlog) {
      return response.status(404).end()
    }
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.patch('/:id', async (request, response, next) => {
  try {
    const idToUpdate = request.params.id
    const body = request.body

    const blogUpdate = {}
    if (body.title !== undefined) blogUpdate.title = body.title
    if (body.url !== undefined) blogUpdate.url = body.url
    if (body.author !== undefined) blogUpdate.author = body.author
    if (body.likes !== undefined) blogUpdate.likes = body.likes

    const updatedBlog = await Blog.findByIdAndUpdate(
      idToUpdate,
      blogUpdate,
      { new: true, runValidators: true }
    )
    if (!updatedBlog) {
      return response.status(404).end()
    }
    response.status(200).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter