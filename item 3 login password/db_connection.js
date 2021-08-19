const Pool = require('pg-pool')

const pool = new Pool({
    database: 'first-db',
    user: 'user1',
    password: 'pass1',
    host: 'localhost',
    port: 5432,
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 1000,
});

module.exports = {
    pool
}