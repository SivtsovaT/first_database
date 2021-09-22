const express = require('express')
const dogsRepository = require('../dogs/dogs_repository')

const router = express.Router()

router.post('/', ((req, res, next) => {
        const docBody = req.body
        dogsRepository.createDog(docBody).
        then(dog => {
            res.send(dog)
        })
            .catch(e => {
                next(e);
            });
    })
)

module.exports = router


