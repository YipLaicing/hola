const server = require('../app.js').server
const supertest = require('supertest')
const should = require('should')

const anyValue = "test"
const uniquePhone = Math.random().toString()

describe('#test app', () => {

    describe('#test server connection', () => {
        it("should return 'affds' when get /aa", async () => {
            let res = await supertest(server).get('/aa').expect(200, 'affds')
        })
    })

    describe('#test api1: register', () => {
        it('should return {userid:"not null or empty",username:username} when phone number unique', done => {
            supertest(server).post('/register')
                .send({
                    username: anyValue,
                    password: anyValue,
                    phone: uniquePhone
                })
                .expect(200).end((err, resp) => {
                    should.not.exist(err)
                    should.exist(resp)
                    resp.body.should.have.property('username', anyValue)
                    resp.body.should.have.property('userid').with.lengthOf(24)
                    return done()
                })
        })

        it('should return {isOK:false} when same phone number exists', (done) => {
            const duplicatePhone = uniquePhone
            supertest(server)
                .post('/register')
                .send({
                    username: anyValue,
                    password: anyValue,
                    phone: duplicatePhone
                })
                .expect(200, { isOK: false }, done)
        })


    })

    describe('#test api2: login', () => {
        it('should return {isOK:false} when the password and phone not match', (done) => {
            const correctPhone = uniquePhone
            const wrongPsssword = "111111"
            supertest(server)
                .post('/login')
                .send({
                    password: wrongPsssword,
                    phone: correctPhone
                })
                .expect(200, { isOK: false }, done)
        })

        it('should return {userid:"not null or empty",username:username} when password and phone match', done => {
            const correctPhone = uniquePhone
            const correctPsssword = anyValue
            supertest(server).post('/login')
                .send({
                    password: correctPsssword,
                    phone: correctPhone
                })
                .expect(200).end((err, resp) => {
                    should.not.exist(err)
                    should.exist(resp)
                    resp.body.should.have.property('username', anyValue)
                    resp.body.should.have.property('userid').with.lengthOf(24)
                    //如果没有填写过gender、signature、avatar，将不返回
                    return done()
                })
        })
    })

    describe('#test api3: put moment', () => {
        const anyNumberString = "110"
        const stringIncludeComma = "qw,er,ty"
        it('should return {isOK:true,momentId:notnull} if everything normal', done => {
            supertest(server).post('/users/:userId/moments')
                .attach('photo', 'test/testphoto.png')
                .field({
                    text: anyValue,
                    longtitude: anyNumberString,
                    latitude: anyNumberString,
                    tags: stringIncludeComma
                })
                .expect(200)
                .end((err, resp) => {
                    should.not.exist(err)
                    should.exist(resp)
                    resp.body.should.have.property('isOK', true)
                    resp.body.should.have.property('momentId').with.lengthOf(24)
                    return done()
                })

        })
        it('should return {isOK:false} if no photo file received', done => {
            supertest(server).post('/users/:userId/moments')
                .field({
                    text: anyValue,
                    longtitude: anyNumberString,
                    latitude: anyNumberString,
                    tags: stringIncludeComma
                })
                .expect(200, { isOK: false }, done)

        })

    })
})