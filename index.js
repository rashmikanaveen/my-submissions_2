const express = require('express')
const morgan = require('morgan');
const{v4 : uuidv4} = require('uuid');


const app = express()

app.use(express.json());


app.use(assignid);


//app.use(morgan(':method :url :status :res[content-length] - :response-time ms" '));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
function assignid(req, res, next) {
  req.id = uuidv4();
  next();
}


morgan.token("id",function getId(req){
  return req.id;
})

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});


let Persons  =
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

app.delete('/api/Persons/:id', (request, response) => {
  const id = request.params.id
  persons = Persons.filter(person => person.id !== id)
  response.status(204).end()
})



app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${Persons.length} people<br>${new Date()}</p>`)})
    
/////////////////////
const generateId = () => {
  const maxId = Persons.length > 0
    ? Math.max(...Persons.map(p => (p.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/Persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  else if (Persons.find(person => person.name === body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const Person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  Persons = Persons.concat(Person)

  response.json(Persons)
})









const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})