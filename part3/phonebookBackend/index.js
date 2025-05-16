const express = require('express')
const { format } = require('date-fns');

app = express()

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
const now = new Date();
const shortday = format(now, 'EEE')

const infoText = `<p>Phonebook has info for ${data.length} people</p>
<p>${format(now, "EEE")} ${format(now, 'MMM d yyyy HH:mm:ss')} GMT+0100 West Africa Time (WAT)</p>`

app.get('/api/persons', (request, response) =>{
  response.json(data)
})

app.get('/info', (request, response) => {
  response.send(infoText)
})



const PORT = 3002
app.listen((PORT), () => {
    console.log("This is the start!")
})