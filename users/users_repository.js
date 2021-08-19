const pool = require('../db_connection').pool;

const getUserById = (userId) => {
    return pool.connect()
        .then(client => {
            const query = `SELECT user_id, last_name, first_name, city
                           FROM first_express.users
                           WHERE user_id = ${userId}`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'Matching user failed';
            }
            return queryResult.rows[0];
        });
}

const getUsers = (offset, limit) => {
    return pool.connect()
        .then(client => {
            const query = `SELECT user_id, last_name, first_name, city
                           FROM first_express.users
                           LIMIT ${limit} OFFSET ${offset}`;
            return client.query(query)
        })
        .then(queryResult => {
            return queryResult.rows;
        });
}

const createUser = (firstName, lastName, city) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO first_express.users (first_name, last_name, city)
                           VALUES ('${firstName}', '${lastName}', '${city}')
                           RETURNING *`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'Saving user failed';
            }
            return queryResult.rows[0];
        });
}

const updateUser = () => {
}

const deleteUser = () => {

}

module.exports = {
    getUsers,
    getUserById,
    createUser
}