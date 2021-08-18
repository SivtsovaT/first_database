const express = require('express')

const credentialsRepository = require('./credentials_repository');

const router = express.Router()

router.get('/authorize', (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader === undefined) {
        next('No token in header')
        return;
    }
    const token = authHeader.split(' ')[1];

    credentialsRepository.authorizeUser(token)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e);
        });
})

router.post('/signUp', (req, res, next) => {
    const newUser = req.body
    credentialsRepository.registerUser(newUser.username, newUser.password)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e);
        });
})

router.post('/signIn', (req, res, next) => {
    const newUser = req.body
    credentialsRepository.authenticateUser(newUser.username, newUser.password)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e);
        });
})

module.exports = router
