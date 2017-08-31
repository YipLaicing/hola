const mongoClient = require('mongodb').MongoClient
const url = require('config').get('db').get('url')

const connection = async () => {
    return await new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, db) {
            resolve(db);
        })
    })
}

const insertUser = async (user) => {

}

const check = async () => {
    const db = await connection();
    db.collection('user').find().toArray(function (e, docs) {
        console.log(docs)
    })
    db.close();
}


module.exports = {
    insertUser,
    check
}