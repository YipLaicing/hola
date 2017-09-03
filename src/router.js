const router = require('koa-router')();
const business = require('./business.js');

const commitTime = require('moment')
const cli = require('cli-color')

const hello = async () => {
    router.get('/aa', async (ctx, next) => {
        ctx.body = 'affds'
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
        console.log(ctx.request)
        // if (ctx.request.type != "multipart/form-data") return { isOK: false, err: "wrong type" }
        if (ctx.request.body.files && ctx.request.body.files.photo) {
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