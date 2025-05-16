const express = require('express')
const { format } = require('date-fns');

app = express()

const now = new Date();
const today = format(now, "EEE")
const dateTime = format(now, 'MMM d yyyy HH:mm:ss')


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

const infoText = `<p>Phonebook has info for ${data.length} people</p>
<p>${today} ${dateTime} GMT+0100 West Africa Time (WAT)</p>`

app.get('/api/persons', (request, response) =>{
  response.json(data)
})

app.get('/info', (request, response) => {
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
  const deletedUpdate = data.filter(person => person.id !== id)

  data = deletedUpdate
  response.json(data)
})

const PORT = 3002
app.listen((PORT), () => {
    console.log("This is the start!")
})