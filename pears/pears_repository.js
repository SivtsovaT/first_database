const pool = require('../db_connection').pool

const addPears = (kind, origin_country, ripening_time, amount, price_per_tree) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO pears (kind, origin_country, ripening_time, amount, price_per_tree) 
                           VALUES ('${kind}', '${origin_country}', '${ripening_time}','${amount}', '${price_per_tree}')
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

module.exports = {
    addPears,
    deletePearById,
    getPears
}