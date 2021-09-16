const {MongoClient} = require('mongodb');
const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const dbName = process.env.MONGO_DATABASE;

const url = `mongodb://${host}:${port}`;
const client = new MongoClient(url);

const databaseConnection = () => {
    return client.connect()
        .then((client) => client.db(dbName));
}

module.exports = {
    databaseConnection: databaseConnection,
}