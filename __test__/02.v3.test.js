const supertest = require('supertest');
const { server } = require('../src/server');
const testRequst = supertest(server);
const { db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop({});
});

describe('v3 routes work as expected', () => {

  it('Should respond with a 404 on an invalid route', () => {
    let address='/foobar'
    return testRequst.get(address).then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('Should return a welcome message for /', () =>{
    let address = '/v3/';
    return testRequst.get(address).then((results)=>{
      expect(results.status).toBe(200);
      expect(results.body.message).toBe('"There no place like home"- Dorothy(Wizard of Oz)');
    })
  })
  xtest('we can create a new user to get a token', async () => {
    let address='/v3/signup'
    let data ={
      username:"admin",
      password:"1234",
      role:"admin",
    }
    const respond = await testRequst.post(address).send(data);
    console.log("🐝" ,respond.body);
    expect(respond.status).toEqual(200);
  });
  xtest('we can create a food with a valid user', async () => {
    const response = await mockServer
      .post('/api/v2/food')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTIwNTN9.0LGnR1YsblULTli1469gMphXK52EA3ITInZxd5UNkrA'
      )
      .send({ name: 'radish', calories: 10, type: 'vegetable' });
    expect(response.status).toBe(201);
  });
  xtest('we can create a food with a valid user', async () => {
    const response = await mockServer
      .get('/api/v2/food')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2OTA2NTIwNTN9.0LGnR1YsblULTli1469gMphXK52EA3ITInZxd5UNkrA'
      );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});