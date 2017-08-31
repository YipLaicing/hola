const router = require('koa-router')();
const business = require('./business.js');

const hello = async () => {
    router.get('/aa', async (ctx, next) => {
        console.log('in hello')
        ctx.body = 'affds'

        const returnVal = await business.check();


    })
}
hello();

const register = async () => {
    router.post('/register', async (ctx, next) => {
        console.log('in register')
        let user
        user.username = ctx.username || ""
        user.phone = ctx.phone || ""
        user.password = ctx.password || ""

        const value = await business.register(user);

        ctx.response.type = 'application/json'
        ctx.body = value;

    })
}
register();





module.exports = {
    router
}