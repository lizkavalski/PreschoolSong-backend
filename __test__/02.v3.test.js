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
  test('Can create a new user', async () => {
    let address='/v3/signup'
    let data ={
      username:"Admin",
      password:"1234",
      role:"admin",
    }
    const respond = await testRequst.post(address).send(data);
    // console.log("🐝" ,respond.body.token);
    expect(respond.status).toEqual(200);
  });
  test('Can sign in as our user', async () => {
    let address='/v3/login'
    let userName='Admin';
    let pass= '1234';
    const respond = await testRequst.post(address).auth(userName,pass);
    console.log("line 44 🐝",respond.body.username);
    expect(respond.status).toBe(200);
    expect(respond.body.username).toBe(userName);
  });
  test('Can make a request to theme', async () => {
    let address='/v3/theme'
    let token= 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNzAyMTc3OTc3LCJleHAiOjE3ODg1Nzc5Nzd9.Ot9VCZgmbzWR2Cv7QQujtzU1tMQYvGVZ1HloTg0PvnE'
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  });
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNzAyMTc3OTc3LCJleHAiOjE3ODg1Nzc5Nzd9.Ot9VCZgmbzWR2Cv7QQujtzU1tMQYvGVZ1HloTg0PvnE

});