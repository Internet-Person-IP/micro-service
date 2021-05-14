const jwt = require('jsonwebtoken')
const axios = require('axios').default
//const axiosCookieJarSupport = require('axios-cookiejar-support').default;
//const tough = require('tough-cookie');
//axiosCookieJarSupport(axios);



const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        //const cookieJar = new tough.CookieJar();
        const token = req.cookies['todo-jt']
        //const {token, user}  = await axios.post(process.env.AUTH)
        //req.token = token
        //req.user = user
        console.log(token)
        const v = await axios.post("http://localhost:5001"+"/auth",{//process.env.AUTH
            //jar: cookieJar,
            withCredentials: true,
            headers:{
                Token: token
            }
        })
        req.user = v.data.user;
        req.token = v.data.token;
        console.log(v.data);

        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please login first.' })
    }
}
module.exports = auth

