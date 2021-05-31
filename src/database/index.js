const mongoose = require('mongoose')



mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/authteste').then(() =>{
    console.log('Mongo successfully connected')
}).catch(() => {
    console.log('Mongo connection failure')
})


module.exports = mongoose


