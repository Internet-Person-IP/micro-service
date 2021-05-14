const jwt = require('jsonwebtoken')
const Users = require('../models/Users-model')

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        let token = req.cookies['todo-jt']
        console.log(req)
        if (token === '') {
            res.redirect(401, '/login')
        }else if(token === undefined){
            token = req.body.headers.Token
        }
        console.log(token)
        const decoded_token = jwt.verify(token, "pizza")
        const user = await Users.findOne({ _id: decoded_token._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please login first.' })
    }
}
module.exports = auth

