const express = require('express')
const User = require('../models/User')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth')

const authConfig = require ('../config/auth.json')


const router = express.Router()


 
 function genereteToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}


//Cadastro de Usuario

router.get('/screenRegister', (req, res) => {
    res.sendFile(__dirname+'/views/register.html')
})


router.post('/register', async (req, res) => {
    const { email } = req.body
    console.log(email)
    try {

        if(await User.findOne( {email} ))
            return res.status(400).send({ error: 'User already exists'})

        if(!email)
            return res.send({ error: 'Você precisa colocar seu email' })
        
        const user = await User.create(req.body)

        user.password = undefined

        return res.send({
            user, 
            token: genereteToken({ id: user.id })
        })


        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' })
        }
})

//Login
router.post('/authenticate', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email }).select('+password')
    console.log(user)
    
    if(!user)
        return res.status(400).send({ error: 'User not found'})
    
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send('Invalid Password')

    user.password = undefined

    res.send({ 
        token: genereteToken({ id: user.id })
    })
   /*  try{
        res.render('http://localhost:8082/home')
    }catch (err) {
        return res.send('Servidor não atingido')
    } */
    
})

router.use(authMiddleware)

module.exports = app => app.use('/auth', router)