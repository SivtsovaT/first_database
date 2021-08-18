const express = require('express')

const usersRepository = require('./users_repository');

const router = express.Router()

router.get('/', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    const groups = req.authorizationGroups;
    if (groups.includes('manager')) {
        usersRepository.getUsers(offset, limit)
            .then(users => {
                res.send(users)
            })
            .catch(error => {
                next(error);
            })
    } else {
        throw {
            code: 1010,
            message: 'User dont have permissions to read this resource, not in group',
            description: 'Check you token or access rights. Contact to administrator'
        }
    }
})
router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId

    usersRepository.getUserById(userId)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e);
        });
})
router.post('/', (req, res, next) => {
    const newUser = req.body

    usersRepository.createUser(newUser.first_name, newUser.last_name, newUser.city)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e);
        });
})

module.exports = router
