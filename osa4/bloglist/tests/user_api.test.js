const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('When there is initially one user saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 13)
    const user = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    })

    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'newpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usersAtTheEnd = users.map(user => user.toJSON())
    assert.strictEqual(usersAtTheEnd.length, usersAtStart.length + 1)

    const usernames = usersAtTheEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})