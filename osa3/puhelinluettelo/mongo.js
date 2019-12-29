const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://aapok:${password}@puhluettelodb-cgjbf.mongodb.net/puhluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const nameSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Name = mongoose.model('Name', nameSchema)



if (process.argv.length > 4) {

    const name = new Name({
        name: process.argv[3],
        number: process.argv[4]
    })

    // process.argv.forEach((val, index) => {
    //     console.log(`${index}: ${val}`);
    // });

    name.save().then(response => {
        console.log(`added ${name.name} number ${name.number} to phonebook`);
        mongoose.connection.close();
    })

} else {
    console.log('phonebook:')
    Name.find({}).then(result => {
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
        })
        mongoose.connection.close()
    })
}