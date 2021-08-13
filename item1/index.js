const express = require('express');
const usersApi = require('./users');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const preAuth = (escapePath) => {
    return (req, res, next) => {

        const authHeader = req.header('Authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            const user = users.find((user) => {
                return user.token === token;
            })
            if (user) {
                req.authorizationGroups = [...user.groups];
                next();
            } else {
                next({
                    code: 1010,
                    message: 'User dont have permissions to read this resource',
                    description: 'Check you token or access rights. Contact to administrator'
                });
            }
        } else {
            if (req.path === escapePath) {
                next();
            } else {
                next({
                    code: 1010,
                    message: 'User dont have permissions to read this resource',
                    description: 'Check you token or access rights. Contact to administrator'
                });
            }
        }

    };
};

app.use(preAuth('/login'));

function check(a, b){
    let first = arguments[0];
    let second = arguments[1];
}

let users = [
    {login: 'tom', password: 'qwerty', token: 'super-token', groups: ['manager', 'users']},
    {login: 'bob', password: 'qwerty', token: 'simple-token', groups: ['users']}
];

app.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    const user = users.find((user) => {
        return user.login === login && user.password === password;
    });

    if (user) {
        res.send(user.token);
    } else {
        res.status(401);
        res.send('failed');
    }
});

app.use('/users', usersApi);
app.use('/superUsers', usersApi);

app.get('/', (req, res) => {
    const name = req.query.name;
    res.send(`Hello, ${name}!`);
});


const postErrorHandler = (err, req, res, next) => {
    console.log(`post ${req.path}`)
    res.status(401).send(err);
}

app.use(postErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});