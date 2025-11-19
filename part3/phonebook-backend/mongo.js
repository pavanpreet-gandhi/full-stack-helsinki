const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Invalid arguments provided.')
    console.log('Usage:')
    console.log('  List all entries: node mongo.js <password>')
    console.log('  Add new entry:    node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pavanpreetgandhi_db_user:${password}@cluster0.lnuuinq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${person} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {console.log(person)})
        mongoose.connection.close()
    })
}
