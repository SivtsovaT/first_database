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


router.get('/', (req, res, next) => {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    appleRepository.getApples(offset, limit)
        .then(apple => {
            res.send(apple);
        })
})

router.delete('/:appleId', (req, res, next) => {
    const appleId = req.params.appleId

    appleRepository.deleteAppleById(appleId)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

router.put('/id/:appleId', (req, res, next) => {
    const appleId = req.params.appleId

    appleRepository.replaceAppleById(appleId)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

module.exports = router