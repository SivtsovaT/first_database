const pool = require('../db_connection').pool

const addPears = (kind, origin_country, ripening_time, amount, price_per_tree) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO first_express.pears (kind, origin_country, ripening_time, amount, price_per_tree) 
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

const deletePearById = (pearId) =>{
    return pool.connect()
        .then(client => {
            const query = `DELETE FROM first_express.pears
                           WHERE id = ${pearId}`
            return client.query(query)
        })
        .then(queryResult =>{
            return queryResult.rows
        })
}

module.exports = {
    addPears,
    deletePearById
}