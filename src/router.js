const router = require('koa-router')();
const business = require('./business.js');

const commitTime = require('moment')

const hello = async () => {
    router.get('/aa', async (ctx, next) => {
        console.log('hello')
        // console.log(ctx.request.body)
        ctx.body = 'affds'
        const returnVal = await business.check();
    })
}
hello();

const register = async () => {
    router.post('/register', async (ctx, next) => {
        let user = {}
        user.username = ctx.request.body.username || ""
        user.phone = ctx.request.body.phone || ""
        user.password = ctx.request.body.password || ""

        ctx.response.type = 'application/json'
        ctx.response.body = await business.register(user);


    })
}
register()

const login = async () => {
    router.post('/login', async (ctx, next) => {
        let user = {}
        user.phone = ctx.request.body.phone || ""
        user.password = ctx.request.body.password || ""

        ctx.response.type = 'application/json'
        ctx.response.body = await business.login(user);

    })
}
login()

const putMoment = async () => {
    router.post('/users/:userId/moments', async (ctx, next) => {
        // console.log(ctx.request.body)
        if (ctx.request.body.files) {
            let moment = {}
            moment.userid = ctx.params.userId
            moment.photo = ctx.request.body.files.photo

            moment.tags = ctx.request.body.fields.tags.split(',')
            moment.text = ctx.request.body.fields.text

            let location = {}
            location.longtitude = Number(ctx.request.body.fields.longtitude)
            location.latitude = Number(ctx.request.body.fields.latitude)
            moment.location = location
            moment.published = ctx.request.body.published || commitTime().format("YYYY-MM-DD HH:mm:ss")

            ctx.body = await business.putMoment(moment)

        } else {
            console.log('no photo received')
            ctx.body = { isOK: false }
        }

    })
}
putMoment()



module.exports = {
    router
}