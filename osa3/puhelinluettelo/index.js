require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Name = require('./models/name')


app.use(cors())

morgan.token('data', function getData(req) {
    return req.data
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(assignData)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

function assignData(req, res, next) {
    req.data = JSON.stringify(req.body)
    next()
}

// let persons = [{
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//     },
//     {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//     },
//     {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//     },
//     {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//     }
// ]

const generateId = () => {
    min = Math.ceil(1);
    max = Math.floor(1024);
    return Math.floor(Math.random() * 1024) + 1;
}



app.post('/api/persons', (request, response, next) => {
    const body = request.body
    // console.log(body)
    // const exists = (element) => element.name === body.name;

    // if (persons.some(exists)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    // if (!body.name) {
    //     return response.status(400).json({
    //         error: 'name missing'
    //     })
    // }

    // if (!body.number) {
    //     return response.status(400).json({
    //         error: 'number missing'
    //     })
    // }

    // if (body.content === undefined) {
    //     return response.status(400).json({ error: 'content missing' })
    //   }

    const name = new Name({
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId(),
    })

    name.save()
        .then(savedName => {
            response.json(savedName.toJSON())
        })
        .catch(error  => next(error))
})




app.get('/info', (req, res) => {
    const time = new Date().toUTCString()
    Name.find({}).then(names => {
        res.send(`<p>Phonebook has info for ${names.length} people </p><p>${time}</p>`)
    })
})

app.get('/api/persons', (req, response) => {
    Name.find({}).then(names => {
        response.json(names.map(name => name.toJSON()))
    })
    .catch(error=> next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Name.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    // .catch(error => {
    //     console.log(error);
    //     response.status(404).send({error: "malformatted id"})
    // })

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    // console.log(body)
    const name = //new Name (
        {
        name: body.name,
        number: body.number,
        date: new Date(),
    }//)

    // const name = {
    //   name: body.name,
    //   number: body.number,
    // }

    // console.log(name)
    // console.log(request.params.id)
    Name.findByIdAndUpdate(request.params.id, {$set: name}, {new:true, runValidators: true, context: 'query'})
        .then(updatedName => {
            console.log(updatedName.toJSON())
            console.log(updatedName)
            response.json(updatedName.toJSON())
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response) => {
    Name.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(409).json({ error: error.message })
    }

    next(error)
}
//Virheelliset pyynnöt
app.use(errorHandler)


const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}
// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})