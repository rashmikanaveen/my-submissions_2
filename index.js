const express = require('express')
const app = express()


const Persons  =
[
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



app.get('/api/Persons', (request, response) => {
  response.json(Persons)
})

app.get('/api/Persons/:id', (request, response) => {
  const id = request.params.id
  const person = Persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})



app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${Persons.length} people<br>${new Date()}</p>`)})
    


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})