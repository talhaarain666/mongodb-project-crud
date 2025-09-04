const { MongoClient } = require('mongodb');

// from mongodb database
let dbConnectionUrl = "mongodb://127.0.0.1:27017/"
// let dbConnectionUrl = "mongodb://localhost:27017/"
const client = new MongoClient(dbConnectionUrl);


let dbConnection = async () => {
    await client.connect();
    let db = client.db("mongoDBProject_Database")
    return db;
}

module.exports={dbConnection}
