require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'),
    '-',
    tokens['response-time'](request, response), 'ms',
    JSON.stringify(request.body)
  ].join(' ')
}))

const validateInput = (request, response, next) => {
  const { name, number } = request.body
    if (!name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }
  if (!number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }
  next()
}

app.get('/info', (request, response, next) => {
  Person.countDocuments().then(count => {
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date().toString()}</p>
    `)
  })
  .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', validateInput, (request, response, next) => {
  const { name, number } = request.body
  const person = new Person({ name, number })
  Person.findOne({ name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({
        error: 'Name must be unique'
      })
    }
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(result => {
      if (!result) {
        return response.status(404).end()
      }
      response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', validateInput, (request, response, next) => {
  const { name, number } = request.body
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
      response.json(updatedPerson)
    })
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})