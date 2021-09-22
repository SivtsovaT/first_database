const mongo = require('../mongo_connection')

const createDog = (docBody) => {
    return mongo.databaseConnection()
        .then((db) =>{
            return db.collection('dogs')
        })
        .then((collection) =>{
            return collection.insertOne({breed: docBody.breed, color: docBody.color, price: docBody.price})
        })
        .then((result) =>{
            if (!result.insertedId){
                throw 'Saving dogs failed'
            }
            const id = result.insertedId
            return {
                docBody,
                id

            }
        })
}

module.exports = {
    createDog
}



