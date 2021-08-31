const pool = require('../db_connection').pool

const addPears = (kind, origin_country, ripening_time, amount, price_per_tree) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO public.pears (kind, origin_country, ripening_time, amount, price_per_tree) 
                           VALUES ('${kind}', '${origin_country}', '${ripening_tim}','${amount}', '${price_per_tree}')
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

module.exports = {
    addPears
}