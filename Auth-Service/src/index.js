const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('./db/mongoose')
const userRoutes = require('./routes/user-routes')
const errorRoutes = require('./routes/error-routes')
let cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5001

const corsOptions = {
    origin: "http://localhost:3000",//process.env.CLIENT,
    credentials: true,
    "Access-Control-Allow-Credentials": true
}

app.use(express.json())
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    }
}))

app.use(userRoutes)
app.use(errorRoutes)

app.listen(port, () => {
    console.log('Auth server is up on port ' + port)
})