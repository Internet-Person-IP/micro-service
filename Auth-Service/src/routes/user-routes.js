const express = require('express')
const Users = require('../models/Users-model')
const auth = require('../middlewares/auth')
const routes = express.Router()
const jwt = require('jsonwebtoken')

// User create (signup)
routes.post('/signup', async (req, res) => {
    const newUser = req.body
    const fieldsToAdd = Object.keys(newUser)
    const fieldsInModel = ['name', 'email', 'password']
    const isAdditionAllowed = fieldsToAdd.every((field) => fieldsInModel.includes(field))

    if (!isAdditionAllowed) {
        return res.status(400).send({ error: 'Invalid fields to Add!' })
    }

    try {
        const user = await Users(newUser)

        await user.save()

        res.send({ user })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// check if previously loggeding
routes.post('/init', auth, async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
        };

        const { token, user } = req
        if (token && user) {
            res.cookie('todo-jt', req.token, cookieOptions).send({ user, token })
        }
    } catch (e) {
        res.status(400).send()
    }
})

// Login user
routes.post('/login', async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
        };

        const user = await Users.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.cookie('todo-jt', token, cookieOptions).send({ user, token })

    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

//logout user
routes.post('/logout', auth, async (req, res) => {
    try {
        const { user, token } = req

        user.tokens = user.tokens.filter((t) => t.token !== token)
        await user.save()

        res.clearCookie('todo-jt')

        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

routes.post('/auth', auth, async (req, res) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const cookieOptions = {
            httpOnly: true,
        };
        let token = req.cookies['todo-jt']

        if (token === '') {
            res.redirect(401, '/login')
        }else if(token === undefined){
            token = req.body.headers.Token
        }
        const decoded_token = jwt.verify(token, "pizza")
        const user = await Users.findOne({ _id: decoded_token._id, 'tokens.token': token })

        res.cookie('todo-jt', token, cookieOptions).send({ user, token })

        
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please login first.' })
    }
})

module.exports = routes