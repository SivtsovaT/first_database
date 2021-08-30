const express = require('express')
const appleRepository = require('./apple_repository');


const router = express.Router()

router.post('/', (req, res, next) => {
    const newApple = req.body

    appleRepository.createApple(newApple.color, newApple.size, newApple.region, newApple.harvest_in_ton)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

module.exports = router