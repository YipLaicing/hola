const db = require('./db.js')

const register = async (user) => {
    //检查
    //...

    const isOK = await db.insertUser(user);
    return isOK;

}

const check = async () => {
    const isOK = await db.check();
    return isOK;
}


module.exports = {
    register,
    check
}