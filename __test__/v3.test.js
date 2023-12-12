const supertest = require('supertest');
const { server } = require('../src/server');
const testRequst = supertest(server);
const { db } = require('../src/models');

const userToken='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJpYXQiOjE3MDIxODA4MjQsImV4cCI6MTc4ODU4MDgyNH0.XsPVoPmB2vUfsFj_hwQxBXkgg5fDHNvy1kAf_7u4gvc'
const adminToken= 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNzAyMTc3OTc3LCJleHAiOjE3ODg1Nzc5Nzd9.Ot9VCZgmbzWR2Cv7QQujtzU1tMQYvGVZ1HloTg0PvnE'
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
  test('As a new user I can sign-up', async () => {
    let address='/v3/signup'
    let data ={
      username:"User",
      password:"user",
      role:"user",
    }
    const respond = await testRequst.post(address).send(data);
    // console.log("🐝" ,respond.body.token);
    expect(respond.status).toEqual(200);
  });
  test('As a new admin I can sign-up', async () => {
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
  test('As a user I can login', async () => {
    let address='/v3/login'
    let userName='User';
    let pass= 'user';
    const respond = await testRequst.post(address).auth(userName,pass);
    expect(respond.status).toBe(200);
    expect(respond.body.username).toBe(userName);
  });
  test('As admin I can login', async () => {
    let address='/v3/login'
    let userName='Admin';
    let pass= '1234';
    const respond = await testRequst.post(address).auth(userName,pass);
    expect(respond.status).toBe(200);
    expect(respond.body.username).toBe(userName);
  });
})

describe("v3 routes for theme", () =>{
  test('As a USER I can not POST to the theme database', async () => {
    let address='/v3/theme'
    let data = {
      category: "test",
      title: "Test",
      description: "Songs related to help learn about different emotions from happy to made"
    }
    let token= userToken
    const respond = ((await testRequst.post(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  })
  test('As a ADMIN I can POST to the theme database', async () => {
    let address='/v3/theme'
    let data = {
      category: "test",
      title: "Test",
      description: "Songs related to help learn about different emotions from happy to made"
    }
    let token= adminToken
    const respond = ((await testRequst.post(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(201);
  })
  test('As a USER I can GET ALL theme', async () => {
    let address='/v3/theme'
    let token= userToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a ADMIN I can GET ALL theme', async () => {
    let address='/v3/theme'
    let token= adminToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 

  test('As a USER I can GET ONE theme', async () => {
    let address='/v3/theme/1'
    let token= userToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a ADMIN I can GET ONE theme', async () => {
    let address='/v3/theme/1'
    let token= adminToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a USER I can not UPDATE to theme database', async () => {
    let address='/v3/theme/1'
    let data = {
      category: "test 1",
    }
    let token= userToken
    const respond = ((await testRequst.put(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  })
  test('As a ADMIN I can UPDATE to theme database', async () => {
    let address='/v3/theme/1'
    let quote = "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)";
    let data = {
      category: "test 1",
    }
    let token= adminToken
    const respond = ((await testRequst.put(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body).toEqual('object');
    expect(respond.body.updatedRecord.id).toEqual(1);
    expect(respond.body.updatedRecord.category).toEqual('test 1');
  })
  test('As a USER I can not DELETE from theme database', async () =>{
    let address='/v3/theme/1'
    let token= userToken
    const respond = ((await testRequst.delete(address).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  })
  test('As a ADMIN I can DELETE from theme database', async () =>{
    let address='/v3/theme/1'
    let quote ='"Danger Will Robinson"--Robot (Lost in Space)'
    let token= adminToken
    const respond = ((await testRequst.delete(address).set('Authorization', token)));
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(respond.body.deletedRecord).toEqual(1);
  })
})


describe("v3 routes for song", () =>{
  test('As a USER I can NOT POST to the song database', async () => {
    let address='/v3/song'
    let token= userToken
    let data = {
      category: "test",	
      url:"https://www.youtube.com/watch?v=1SGbjbx4cqs"
    }
    const respond = ((await testRequst.post(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  });
  test('As a ADMIN I can POST to the song database', async () => {
    let address='/v3/song'
    let data = {
      category: "test",	
      url:"https://www.youtube.com/watch?v=1SGbjbx4cqs"
    }
    let token= adminToken
    const respond = ((await testRequst.post(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(201);
  })
  test('As a USER I can GET ALL song', async () => {
    let address='/v3/song'
    let token= userToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a ADMIN I can GET ALL theme', async () => {
    let address='/v3/song'
    let token= adminToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 

  test('As a USER I can GET ONE song', async () => {
    let address='/v3/song/1'
    let token= userToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a ADMIN I can GET ONE song', async () => {
    let address='/v3/song/1'
    let token= adminToken
    const respond = await testRequst.get(address).set('Authorization', token);
    expect(respond.status).toBe(201);
  }); 
  test('As a USER I can not UPDATE to song database', async () => {
    let address='/v3/song/1'
    let data = {
      category: "test 1",
    }
    let token= userToken
    const respond = ((await testRequst.put(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  })
  test('As a ADMIN I can UPDATE to the song database', async () => {
    let address='/v3/song/1'
    let quote = "“Hockety pockety wockety wack! Odds and ends and bric-a-brac!”- Merlin(The Sword in the Stone)";
    let data = {
      category: "test 1",
    }
    let token= adminToken
    const respond = ((await testRequst.put(address).send(data).set('Authorization', token)));
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(typeof respond.body).toEqual('object');
    expect(respond.body.updatedRecord.id).toEqual(1);
    expect(respond.body.updatedRecord.category).toEqual('test 1');
  })
  test('As a USER I can not DELETE from song database', async () =>{
    let address='/v3/song/1'
    let token= userToken
    const respond = ((await testRequst.delete(address).set('Authorization', token)));
    expect(respond.status).toBe(500);
    expect(respond.body.errorMessage).toBe('Access Denied')
  })
  test('As a ADMIN I can DELETE from songdatabase', async () =>{
    let address='/v3/song/1'
    let quote ='"Danger Will Robinson"--Robot (Lost in Space)'
    let token= adminToken
    const respond = ((await testRequst.delete(address).set('Authorization', token)));
    expect(respond.status).toBe(200);
    expect(respond.body.message).toBe(quote)
    expect(respond.body.deletedRecord).toEqual(1);
  })

});