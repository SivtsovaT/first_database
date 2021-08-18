const Pool = require('pg-pool')

const pool = new Pool({
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    max: process.env.DATABASE_POOL_SIZE || 5,
    schema: process.env.DATABASE_SCHEME || 'public',
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 1000,
});

module.exports = {
    pool
}