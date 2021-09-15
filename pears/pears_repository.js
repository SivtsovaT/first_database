const pool = require('../db_connection').pool

const addPears = (newPear) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO pears (kind, origin_country, ripening_time, amount, price_per_tree)
                           VALUES ('${newPear.kind}', '${newPear.origin_country}', '${newPear.ripening_time}',
                                   '${newPear.amount}', '${newPear.price_per_tree}')
                           RETURNING *`
            return client.query(query)
        })
        .then(queryResult =>{
            if(queryResult.rowCount !== 1){
                throw 'Failed to add new pear ;('
            }
            return queryResult.rows[0]
        })

}

const getPears = (limit, offset) =>{
    return pool.connect()
        .then(client => {
            const query = `SELECT kind           AS Сорт,
                                  origin_country AS Происхождение,
                                  ripening_time  AS Плодоносит,
                                  price_per_tree AS Цена_за_дерево
                           FROM pears
                           ORDER BY kind
                           LIMIT ${limit} OFFSET ${offset}`
            return client.query(query)
        })
        .then(queryResult =>{
            if (queryResult.rowCount === 0){
                throw 'There is no a pear tree yet'
            }
            return queryResult.rows
        })
}

const deletePearById = (pearId) =>{
    return pool.connect()
        .then(client => {
            const query = `DELETE FROM pears
                           WHERE id = ${pearId}`
            return client.query(query)
        })
        .then(queryResult =>{
            return queryResult.rows
        })
}

const changePearById = (pearId, kind, origin_country, ripening_time, amount, price_per_tree) =>{
    return pool.connect()
        .then(client =>{
            const query = `UPDATE pears
                           SET kind='${kind}',
                               origin_country='${origin_country}',
                               ripening_time='${ripening_time}',
                               amount=${amount},
                               price_per_tree=${price_per_tree}
                           WHERE id = ${pearId}`
            return client.query(query)
        })
        .then(queryResult =>{
            if(queryResult.rowCount !== 1){
                throw 'No records with such id. Try another.'
            }
            return 'The record is updated'
        })
}

const getPearById = (pearId) => {
    return pool.connect()
        .then(client =>{
            return client.query(
                `SELECT * FROM pears WHERE id = ${pearId}`
            )
        })
        .then(queryResult =>{
            if (queryResult.rowCount !== 1) {
                throw 'No user with such id';
            }
            return queryResult.rows[0];
        })

}

const getPearsInRange = (minAmount, maxAmount)=>{
    return pool.connect()
        .then(client => {
            return client.query(`SELECT kind, origin_country, price_per_tree
            FROM pears
            WHERE amount BETWEEN ${minAmount} AND ${maxAmount}`)
        })
        .then(queryResult =>{
            if(queryResult.rowCount !== 1){
                throw 'No records in these range. Try another.'
            }
            return queryResult.rows
        })
}

module.exports = {
    addPears,
    deletePearById,
    changePearById,
    getPears,
    getPearById,
    getPearsInRange
}