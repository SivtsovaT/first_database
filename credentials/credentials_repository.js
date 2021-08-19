const pool = require('../db_connection').pool;

const registerUser = (username, password, groups) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO first_express.user_credentials (username, password, roles)
                           VALUES ('${username}', '${password}', '{"user","manager"}')
                           RETURNING username`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'Saving user failed';
            }
            return queryResult.rows[0];
        });
}

const authenticateUser = (username, password) => {
    return pool.connect()
        .then(client => {
            const token = `token-at-${Date.now()}`
            const query = `UPDATE first_express.user_credentials
                           SET token='${token}'
                           WHERE username = '${username}'
                             AND password = '${password}'
                           RETURNING username,token`;
            return client.query(query)
        })
        .then(queryResult => {
            if (queryResult.rowCount !== 1) {
                throw 'User unauthenticated';
            }
            return queryResult.rows[0];
        });
}

const authorizeUser = (token) => {
    return pool.connect()
        .then(client => {
            const query = `SELECT username, roles
                           FROM first_express.user_credentials
                           WHERE token = '${token}'`;
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
    registerUser,
    authenticateUser,
    authorizeUser
}