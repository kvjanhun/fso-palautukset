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

module.exports = {
  initialBlogs,
  validBlog,
  noLikesBlog,
  titlelessBlog,
  urllessBlog
}
