const mongoose = require('mongoose')

const dbPassword = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]
const url = `mongodb+srv://konsta:${dbPassword}@cluster0.qfsc69b.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: personNumber,
})

const printAllPersons = () => {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const savePerson = () => {
  person.save()
    .then(result => {
      console.log(`Added ${personName} number ${personNumber} to phonebook.`)
      mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <db_password> <name> <number>')
  process.exit(1)
} else if (process.argv.length === 3) {
  printAllPersons()
} else if (process.argv.length === 5) {
  savePerson()
} else {
  console.log('Usage: node mongo.js <db_password> <name> <number>')
  mongoose.connection.close()
}
