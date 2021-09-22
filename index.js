require('dotenv').config()
const express = require('express')
const usersApi = require('./users/users')
const applesApi = require('./apple/apple')
const dogsApi = require('./dogs/dogs')
const credentialsApi = require('./credentials/credentials')
const bodyParser = require('body-parser')
const pearsApi = require('./pears/pears')
const app = express()
const port = process.env.APP_PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const preAuthorization = (escapePaths) => {
    return (req, res, next) => {

        if (escapePaths.includes(req.path)) {
            next();
        } else {
            const authHeader = req.header('Authorization');
            if (authHeader) {
                const token = authHeader.split(' ')[1]
                credentialsDB.authorizeUser(token)
                    .then(
                        (userData) => {
                            req.authorizationGroups = [...userData.roles];
                            next();
                        }
                    ).catch((e) => next(e))
            } else {
                next('No authorization header')
            }
        }


        if (escapePaths.includes(req.path)) {
            next();
        } else {
            const authHeader = req.header('Authorization');
            if (authHeader) {
                const token = authHeader.split(' ')[1]
                credentialsDB.authorizeUser(token)
                    .then(
                        (appleData) => {
                            req.authorizationGroups = [...applesData.roles];
                            next();
                        }
                    ).catch((e) => next(e))
            } else {
                next('No authorization header')
            }
        }

    }
}

//app.use(preAuthorization(['/login', '/signIn', '/signUp', '/authorize']));

app.use('/users', usersApi);
app.use('/apples', applesApi);
app.use('/superUsers', usersApi);
app.use(credentialsApi);
app.use('/pears', pearsApi)
app.use('/dogs', dogsApi)

app.get('/', (req, res) => {
    const name = req.query.name
    res.send(`Hello, ${name}!`)
})


const postErrorHandler = (err, req, res, next) => {
    console.log(`post ${req.path}`)
    res.status(401).send(err);
}

app.use(postErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


