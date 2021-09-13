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

router.put('/:appleId', (req, res, next) => {
    const appleId = req.params.appleId
    const newApple = req.body

    appleRepository.replaceAppleById(appleId, newApple)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

router.get('/id/:appleId', (req, res, next) => {
    const appleId = req.params.appleId

    appleRepository.getAppleById(appleId)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

router.get('/color/:appleColor', (req, res, next) => {
    const appleColor = req.params.appleColor

    appleRepository.applesByKind(appleColor)
        .then(apple => {
            res.send(apple)
        })
        .catch(e => {
            next(e);
        });
})

module.exports = router