require('dotenv').config()
const express = require('express')
const { format } = require('date-fns');
const morgan = require('morgan')
const Person =  require('./models/person')

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) =>{
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  let now = new Date();
  let today = format(now, "EEE")
  let dateTime = format(now, 'MMM d yyyy HH:mm:ss')
  let infoText = `<p>Phonebook has info for ${data.length} people</p> 
  <p>${today} ${dateTime} GMT+0100 West Africa Time (WAT)</p>`
  response.send(infoText)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(person => person.id === id)

  if (person) {
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const deletedPerson = data.find(person => person.id === id)
  const deletedUpdate = data.filter(person => person.id !== id)

  data = deletedUpdate
  response.json(deletedPerson)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  //const name = data.find(person => person.name === body.name)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  /*if(name) {
    return response.status(409).json({
      error: "name must be unique"
    })
  }*/

  const personUpdate = new Person({
    name: body.name,
    number: body.number,
  })

  personUpdate.save().then(update => {
    response.json(update)
  })
})

const PORT = process.env.PORT
app.listen((PORT), () => {
    console.log("This is the start!")
})