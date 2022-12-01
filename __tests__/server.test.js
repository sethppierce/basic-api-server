'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API', () => {
  test('handles invalid route', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });
  test('handles invalid method', async () => {
    const response = await request.post('/');

    expect(response.status).toEqual(404);
  });
  // /pets tests
  test('Creates a pet', async () => {
    let response = await request.post('/pets').send({
      name: 'test',
      age: 2,
      species: 'dog',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.age).toEqual(2);
    expect(response.body.species).toEqual('dog');
  });

  test('finds all pets', async () => {
    let response = await request.get('/pets');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('test');
    expect(response.body[0].age).toEqual(2);
    expect(response.body[0].species).toEqual('dog');
  });
  test('finds one pet', async () => {
    let response = await request.get('/pets/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.age).toEqual(2);
    expect(response.body.species).toEqual('dog');
  });
  test('updates pet', async () => {
    let response = await request.put('/pets/1').send({
      name: 'update',
      age: 3,
      species: 'fish',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('update');
    expect(response.body.age).toEqual(3);
    expect(response.body.species).toEqual('fish');
  });
  test('deletes pet', async () => {
    let response = await request.delete('/pets/1');

    expect(response.status).toEqual(204);
  });
  // /games
  test('Creates a game', async () => {
    let response = await request.post('/games').send({
      name: 'test',
      rating: 'PG',
      genre: 'strategy',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.rating).toEqual('PG');
    expect(response.body.genre).toEqual('strategy');
  });

  test('finds all games', async () => {
    let response = await request.get('/games');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('test');
    expect(response.body[0].rating).toEqual('PG');
    expect(response.body[0].genre).toEqual('strategy');
  });
  test('finds one game', async () => {
    let response = await request.get('/games/1');

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.rating).toEqual('PG');
    expect(response.body.genre).toEqual('strategy');
  });
  test('updates game', async () => {
    let response = await request.put('/games/1').send({
      name: 'update',
      rating: 'PG13',
      genre: 'shooter',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('update');
    expect(response.body.rating).toEqual('PG13');
    expect(response.body.genre).toEqual('shooter');
  });
  test('deletes game', async () => {
    let response = await request.delete('/games/1');

    expect(response.status).toEqual(204);
  });
});
