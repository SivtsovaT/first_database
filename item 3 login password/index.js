const express = require('express')
const usersApi = require('./users')
const credentialsApi = require('./credentials')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const preAuth = (escapePaths) => {
    return (req, res, next) => {

        const authHeader = req.header('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            const user = users.find((user) => {
                return user.token === token
            })
            if (user) {
                req.authorizationGroups = [...user.groups];
                next();
            } else {
                next({
                    code: 1010,
                    message: 'User dont have permissions to read this resource',
                    description: 'Check you token or access rights. Contact to administrator'
                })
            }
        } else {
            if (escapePaths.includes(req.path)) {
                next();
            } else {
                next({
                    code: 1010,
                    message: 'User dont have permissions to read this resource',
                    description: 'Check you token or access rights. Contact to administrator'
                })
            }
        }

    }
}

//app.use(preAuth(['/login', '/signIn', '/signUp', '/authorize']));

app.use('/users', usersApi);
app.use('/superUsers', usersApi);
app.use(credentialsApi);

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