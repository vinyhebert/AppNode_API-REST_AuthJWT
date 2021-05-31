const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))


require('./controllers/authController')(app)


app.get('/home', (req, res) => {
    res.sendFile(__dirname+'/views/index.html')
})


app.get('/screenRegister', (req, res) => {
    res.sendFile(__dirname+'/views/register.html')
})


app.listen(4000)


