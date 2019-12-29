const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false)
// if (process.argv.length < 3) {
    // console.log('give password as argument')
    // process.exit(1)
// }

// const password = process.argv[2]
// const url =
    // `mongodb+srv://aapok:${password}@puhluettelodb-cgjbf.mongodb.net/puhluettelo?retryWrites=true&w=majority`


const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const nameSchema = new mongoose.Schema({
    name: {type: String, required:true, unique:true, minlength:3},
    number: {type: String, required:true, minlength:8}
})

// const Name = mongoose.model('Name', nameSchema)

nameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  nameSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Name', nameSchema)