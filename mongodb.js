//nodejs connect with mongodb
const {MongoClient} = require('mongodb'); //mongodb package import
const url = 'mongodb://127.0.0.1:27017'; /*eta kaj na korle just restart pc &    mongodb te just "mongodb://localhost:27017" eta port thakley hbe*/
const databaseName = 'pronoyDB';
const client = new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection('part01');
}

dbConnect();

module.exports = dbConnect;