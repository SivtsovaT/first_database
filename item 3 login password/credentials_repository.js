const pool = require('./db_connection').pool;

const registerUser = (username, password, groups) => {
    return pool.connect()
        .then(client => {
            const query = `INSERT INTO user_credentials (username, password)
                        VALUES ('${username}', '${password}') RETURNING username`;
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
            const query = `UPDATE user_credentials SET token='${token}' WHERE username='${username}' AND password='${password}' RETURNING username,token`;
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
            const query = `SELECT username FROM user_credentials WHERE token='${token}'`;
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