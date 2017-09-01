const url = require('config').get('db').get('url')
const mongo = require('mongodb')
const monk = require('monk')
const db2 = monk(url)

const userCollection = db2.get('user')
const momentCollection = db2.get('moment')
const commentCollection = db2.get('comment')

const getUserInfo = async (phone) => {
    const returnValue = await new Promise((resol, rej) => {
        userCollection.find({ 'phone': phone }, (err, resp) => {
            if (err) {
                console.error(err)
                resol(false)
            }
            if (Array.isArray(resp) && resp.length == 0)
                resol(false)

            console.log(resp)
            delete resp[0].password
            resol(resp[0])
        })
    })
    return returnValue
}

const insertUser = async (user) => {
    const returnValue = await new Promise((resol, reject) => {
        userCollection.insert(user, function (e, res) {
            if (e) {
                console.error(e)
                resol(false)
            }
            else
                resol(true)
        })
    })
    return returnValue
}

const checkPhone = async (phone) => {
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

const checkPassword = async (user) => {
    const isMatched = await new Promise((resol, reje) => {
        userCollection.find({ 'phone': user.phone, 'password': user.password }, (err, resp) => {
            if (err) {
                console.error(err)
                resol(false)
            }
            if (Array.isArray(resp) && resp.length != 0) {
                resol(true)
            }
            else {
                resol(false)
            }
        })
    })
    return isMatched
}

const insertMoment = async (moment) => {
    const momentId = await new Promise((resol, rej) => {
        momentCollection.insert(moment, (err, resp) => {
            if (err) {
                console.error(err)
                resol(false)
            }
            else {
                console.log(resp)
                resol(resp._id)
            }
        })
    })
    return momentId
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
    checkPhone,
    check,
    getUserInfo,
    insertMoment,
    checkPassword
}