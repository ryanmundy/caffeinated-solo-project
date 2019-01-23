const app = require('../server.js');

const testServer = require('supertest');

describe('Testing /user', () => {
    test('It should protect the /user route', () => {
        testServer(app).get('/api/user')
            .then((response) => {
                expect(response.statusCode).toBe(403)
            })

    })

})