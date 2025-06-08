const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://FullStackOpen:${password}@cluster0.wl7p73e.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const [name, number] = process.argv.slice(3)

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })

}else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        });
        mongoose.connection.close()
    })
}