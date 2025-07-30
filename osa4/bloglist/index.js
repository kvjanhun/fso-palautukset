const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
logger.info(`Connected to MongoDB at ${mongoUrl}`)

app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})