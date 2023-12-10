
const supertest = require("supertest");
const {server} = require('../src/server');
const testRequst = supertest(server);
const {db} = require('../src/models')
// const v1Router = require("../src/rouates/v1");

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop({});
});

// Your actual tests
describe("v1 routes", () => {

  it('Should respond with a 404 on an invalid route', () => {
    let address='/foobar'
    return testRequst.get(address).then((results) => {
      expect(results.status).toBe(404);
    });
  });
  it('Should return a welcome message for /', () =>{
    let address = '/v1/';
    return testRequst.get(address).then((results)=>{
      expect(results.status).toBe(200);
      expect(results.body.message).toBe('"There no place like home"- Dorothy(Wizard of Oz)');
    })
  })
  it('Should POST a theme', async () =>{
    const data = {
      category: "test",
	    title: "Test",
	    description: "Songs related to help learn about different emotions from happy to made",
    };
    let address='/v1/theme';
    const respond = await testRequst.post(address).send(data);
    console.log('📬 this the reponds',respond.body)
    expect(respond.status).toBe(201);
    expect(respond.body.newRecord.id).toBeDefined();
    expect(respond.body.newRecord['category']).toEqual('test');
  });
  it('Should POST a song', async ()=>{
    const data = {
      category: "test",
      url: "https://www.youtube.com/watch?v=1SGbjbx4cqs"
    };
    let address='/v1/song';
    const respond = await testRequst.post(address).send(data);
    console.log('📬 this the reponds',respond.body)
    expect(respond.status).toBe(201);
    expect(respond.body.newRecord.id).toBeDefined();
    expect(respond.body.newRecord['category']).toEqual('test');
  })
  // Add more tests for other routes as needed
});
