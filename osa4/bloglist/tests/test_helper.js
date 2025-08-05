// Returns true if the blogs are equal
const blogsAreEqual = (blog1, blog2) => {
  return (
    blog1.title === blog2.title &&
    blog1.author === blog2.author &&
    blog1.url === blog2.url &&
    blog1.likes === blog2.likes
  )
}

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
  },
  {
    title: 'Importance of regression testing',
    author: 'A. Smartman',
    url: 'https://www.com/important_blog.php',
    likes: 69
  }
]

const validBlog = {
  title: 'Importance of regression testing',
  author: 'A. Smartman',
  url: 'https://www.com/important_blog.php',
  likes: 69
}

const noLikesBlog = {
  title: 'Nobody likes this blog',
  author: 'Someone Unimportant',
  url: 'https://worst.blog.ever'
}

const titlelessBlog = {
  author: 'Test Author',
  url: 'Has Url',
  likes: 5
}

const urllessBlog = {
  title: 'Has Title',
  author: 'Test Author',
  likes: 5
}

const validBlogUpdate = {
  title: 'Updated Blog Title',
  author: 'Updated Author',
  url: 'https://updated-url.com',
  likes: 10
}

const urllessBlogUpdate = {
  title: 'Updated Blog Title',
  author: 'Updated Author',
  likes: 10
}

const titlelessBlogUpdate = {
  url: 'https://updated-url.com',
  author: 'Updated Author',
  likes: 10
}

module.exports = {
  blogsAreEqual,
  initialBlogs,
  noLikesBlog,
  titlelessBlog,
  titlelessBlogUpdate,
  urllessBlog,
  urllessBlogUpdate,
  validBlog,
  validBlogUpdate,
}
