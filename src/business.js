const db = require('./db.js')

const fs = require('fs')
const path = require('path')

const register = async (user) => {
    let isOK
    const isUnique = await db.checkPhone(user.phone)
    isOK = isUnique
    if (isUnique) {
        isOK = await db.insertUser(user);
    }
    if (isOK) {
        //这里返回的是userid，username
        const info = await getUserInfo(user.phone)
        return info
    }
    return { isOK }
}

const login = async (user) => {
    const isMatched = await db.checkPassword(user)
    if (isMatched === true) {
        const info = await getUserInfo(user.phone)
        return info
    }
    else {
        return {
            isOK: false,
            // err: "wrong password"
        }
    }
}

const getUserInfo = async (phone) => {
    /**
     * username
     * gender  //可能没有
     * signature  //可能没有
     * avatar  //可能没有
     * userid
     */
    const info = await db.getUserInfo(phone)
    info.userid = info._id
    delete info._id
    delete info.phone
    return info
}


const check = async () => {
    const isOK = await db.check();
    return isOK;
}

const putMoment = async (moment) => {

    //photo处理
    const imgLoc = path.join('photo', Math.random().toString())
    // const reader = fs.createReadStream(moment.photo.path)
    // const stream = fs.createWriteStream(path.join('public', imgLoc))
    // reader.pipe(stream)
    moment.photo = imgLoc
    console.log(imgLoc)

    //插入数据库

    const momentId = await db.insertMoment(moment)
    if (momentId) {
        return {
            isOK: true,
            momentId
        }
    }
    else return { isOK: false }

}



module.exports = {
    register,
    check,
    login,
    putMoment
}