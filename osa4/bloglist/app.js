require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const errorHandler = require('./utils/middleware').errorHandler

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB.')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(errorHandler)

module.exports = app