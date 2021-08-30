const pool = require('../db_connection').pool;

const createApple = (color, size, region, harvestInTon) => {

    return pool.connect()
        .then(client => {
            const query = `INSERT INTO public.apples (color, size, region, harvest_in_ton)
                           VALUES ('${color}', '${size}', '${region}', '${harvestInTon}') RETURNING *`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'Saving user failed';
            }
            return queryResult.rows[0];
        });
}

module.exports = {
    createApple

}