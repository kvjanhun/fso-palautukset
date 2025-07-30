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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}