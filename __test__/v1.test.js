const supertest = require("supertest");
const {server} = require('../src/server');
const testRequst = supertest(server);
const {db} = require('../src/models')

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop({});
});

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
})

describe("v1 routes for theme", () =>{
  it('Should POST a theme', async () =>{
    const data = {
      category: "test",
	    title: "Test",
	    description: "Songs related to help learn about different emotions from happy to made",
    };
    let address='/v1/theme';
    const respond = await testRequst.post(address).send(data);
    expect(respond.status).toBe(201);
    expect(respond.body.newRecord.id).toBeDefined();
    expect(respond.body.newRecord['category']).toEqual('test');
    Object.keys(data).forEach((key) => {
      expect(data[key]).toEqual(respond.body.newRecord[key]);
    });
  });
  it('Should GET ALL theme', async ()=>{
    let address = '/v1/theme';
    let quote = '"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)'
    const respond = await testRequst.get(address);
    expect(respond.status).toBe(201);
    expect(respond.body.message).toBe(quote)
    expect(Array.isArray(respond.body.allRecords)).toBeTruthy();
    expect(respond.body.allRecords.length).toEqual(1);
  })
  it('Should GET ONE record of theme', async () => {
    let address= '/v1/theme/1';
    let quote = '"Magic Mirror on the wall, who is the fairest one of all?”- Queen (Snow White and the Seven Drawfs)'
    const respond = await testRequst.get(address);
    expect(respond.status).toBe(201);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body.theRecord).toEqual('object');
    expect(respond.body.theRecord.id).toEqual(1);
  })
  it('Should UPDATE a theme', async ()=>{
    let address ='/v1/theme/1';
    let quote = "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)";
    let data = { category: 'test1' };
    const respond = await testRequst.put(address).send(data);
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body).toEqual('object');
    expect(respond.body.updatedRecord.id).toEqual(1);
    expect(respond.body.updatedRecord.category).toEqual('test1');
  })
  it('Should DELETE a theme', async ()=>{
    let address ='/v1/theme/1';
    let getAddress ='/v1/theme'
    let quote ='"Danger Will Robinson"--Robot (Lost in Space)'
    const respond = await testRequst.delete(address)
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(respond.body.deletedRecord).toEqual(1);

    const getResponse = await testRequst.get(getAddress);
    expect(getResponse.body.allRecords.length).toEqual(0)
  })
})

describe("v1 routes for songs", () =>{
  it('Should POST a song', async ()=>{
    const data = {
      category: "test",
      url: "https://www.youtube.com/watch?v=1SGbjbx4cqs"
    };
    let address='/v1/song';
    const respond = await testRequst.post(address).send(data);
    expect(respond.status).toBe(201);
    expect(respond.body.newRecord.id).toBeDefined();
    expect(respond.body.newRecord['category']).toEqual('test');
  })
  it('Should GET ALL song', async ()=>{
    let address = '/v1/song'
    let quote = '"“Aw, you guys made me ink.”- Pearl (Finding Nemo.)'
    const respond = await testRequst.get(address);
    expect(respond.status).toBe(201);
    expect(respond.body.message).toBe(quote)
    expect(Array.isArray(respond.body.allRecords)).toBeTruthy();
    expect(respond.body.allRecords.length).toEqual(1);
  })
  it('Should GET ONE record of a song', async () => {
    let address= '/v1/song/1'
    let quote = '"Magic Mirror on the wall, who is the fairest one of all?”- Queen (Snow White and the Seven Drawfs)'
    const respond = await testRequst.get(address);
    expect(respond.status).toBe(201);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body.theRecord).toEqual('object');
    expect(respond.body.theRecord.id).toEqual(1);
  })
  it('Should UPDATE a song', async ()=>{
    let address ='/v1/song/1';
    let quote = "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)";
    let data = { category: 'test1' };
    const respond = await testRequst.put(address).send(data);
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body).toEqual('object');
    expect(respond.body.updatedRecord.id).toEqual(1);
    expect(respond.body.updatedRecord.category).toEqual('test1');
  })
  it('Should DELETE a song', async ()=>{
    let address ='/v1/song/1';
    let getAddress ='/v1/song'
    let quote ='"Danger Will Robinson"--Robot (Lost in Space)'
    const respond = await testRequst.delete(address)
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(respond.body.deletedRecord).toEqual(1);

    const getResponse = await testRequst.get(getAddress);
    expect(getResponse.body.allRecords.length).toEqual(0)
  })

})
  // Add more tests for other routes as needed
