const express = require('express')
const pears_repository = require('./pears_repository')

const router = express.Router()

router.post('/pears', ((req, res, next) => {
        const newPear = req.body
        pears_repository.addPears(newPear.kind, newPear.origin_country, newPear.ripening_time, newPear.amount, newPear.price_per_tree)
            .then(user => {
                res.send(user)
            })
            .catch(e => {
                next(e)
            })

    }
))

router.delete('/pears/:pearId', ((req, res, next) =>{
    const pearId = req.params.pearId

    pears_repository.deletePearById(pearId)
        .then(user => {
            res.send(user)
        })
        .catch(e => {
            next(e)
        })
}) )

router.put('/:pearId', ((req, res, next) =>{
    const pearId = req.params.pearId
    const changedPear = req.body

    pears_repository.changePearById(pearId, changedPear.kind, changedPear.origin_country, changedPear.ripening_time,
        changedPear.amount, changedPear.price_per_tree)
        .then(pear =>{
            res.send(pear)
        })
        .catch(e =>{
            next(e)
        })
}))

module.exports = router