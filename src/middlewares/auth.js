const jwt = require('jsonwebtoken')
const authConfig = require ('../config/auth.json')



module.exports = (req, res, next) => {
    const authHeaders = req.headers.authorization
    

    //validações do middleware
    if (!authHeaders)
        return res.status(401).send({ error: "No token provided" })

    const parts = authHeaders.split(' ')

    if (!parts.length === 2 )
        return res.status(401).send({ erro: 'Token error'})

    const [scheme, token] = parts

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token Malformatted' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        console.log(decoded)
        if (err) return res.status(401).send({ error: 'Token invalid' })

        req.userId = decoded.id // Conteudo -> { id: '60945f3d6f871338445c04da', iat: 1620346975, exp: 1620433375 }
        return next()
    })
    
}