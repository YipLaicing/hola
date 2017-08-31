const url = require('config').get('db').get('url')
const mongo = require('mongodb')
const monk = require('monk')
const db2 = monk(url)

const userCollection = db2.get('user')

const insertUser = async (user) => {
    const returnValue = await new Promise((resol, reject) => {
        userCollection.insert(user, function (e, res) {
            if (e) {
                resol(false)
                console.error(e)
            }
            else
                resol(true)
        })
    })
    return returnValue
}

const checkUser = async (phone) => {
    const isUnique = await new Promise((resol, rej) => {
        userCollection.find({ 'phone': phone }, (err, resp) => {
            if (err) {
                console.error(err)
                resol(false)
            }
            else {
                if (Array.isArray(resp) && resp.length != 0)
                    resol(false)
                else
                    resol(true)
            }
        })
    })
    return isUnique
}

const check = async () => {
    // userCollection.find({}, function (e, docs) {
    //     console.log(docs)
    // })
    userCollection.find({}).then((docs) => {
        console.log(docs)
    })
}


module.exports = {
    insertUser,
    checkUser,
    check
}