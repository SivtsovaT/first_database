const pool = require('../db_connection').pool;

const createApple = (color, size, region, harvestInTon) => {

    return pool.connect()
        .then(client => {
            const query = `INSERT INTO apples (color, size, region, harvest_in_ton)
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

const getApples = (offset, limit) => {
    return pool.connect()
        .then(client => {
            const query = `SELECT apple_id, color, size, region, harvest_in_ton
                           FROM apples ORDER BY color
                           LIMIT ${limit} OFFSET ${offset}
                           `;
            return client.query(query)
        })
        .then(queryResult => {
            return queryResult.rows;
        });
}

const deleteAppleById = (appleId) => {
    return pool.connect()
        .then(client => {
            const query = `DELETE
                           FROM apples
                           WHERE apple_id = ${appleId}`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'Matching user failed';
            }
            return queryResult.rows[0];
        });
}

module.exports = {
    createApple,
    getApples,
    deleteAppleById

}