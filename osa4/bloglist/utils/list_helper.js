const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const compareBlogLikes = (max, blog) =>
    blog.likes > max.likes
      ? blog
      : max
  return blogs.reduce(compareBlogLikes, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogsCount = _.countBy(blogs, 'author')
  const authors = _.map(blogsCount, (count, author) => ({
    author,
    blogs: count
  }))
  return _.maxBy(authors, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}