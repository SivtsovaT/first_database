const pool = require('../db_connection').pool;

const createApple = (color, size) => {

    return pool.connect()
        .then(client => {
            const query = `INSERT INTO public.apples (color, size)
                           VALUES ('${color}', '${size}') RETURNING *`;
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