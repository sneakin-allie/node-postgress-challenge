require( 'dotenv' ).config();
const { expect } = require('chai');
const supertest = require('supertest');
const knex = require('knex')
const app = require('./../app');
const { DATABASE_URL } = require( './../config' );

describe('Sports API:', function () {
  let db;
  let sports = [
    { "name": "Soccer", "players": 11 },
    { "name": "Basketball", "players": 5 },
    { "name": "Voleyball", "players": 6 }
  ];

  before('make knex instance', () => {  
    db = knex({
      client: 'pg',
      connection: DATABASE_URL
    })
  });
  
  before('cleanup', () => db.raw('TRUNCATE TABLE sport RESTART IDENTITY;'));

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE sport RESTART IDENTITY;')); 

  after('disconnect from the database', () => db.destroy()); 

  describe('GET /api/sports', () => {

    beforeEach('insert some sports', () => {
      return db('sport').insert(sports);
    })

    it('should respond to GET `/api/sports` with an array of sports and status 200', function () {
      return supertest(app)
        .get('/api/sports')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(sports.length);
          res.body.forEach((item) => {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'name', 'players');
          });
        });
    });

  });

  describe('DELETE /api/sports/delete/:sport_id', () => {

    beforeEach('insert some sports', () => {
      return db('sport').insert(sports);
    })

    it('should delete a sport by id', () => {
      return db('sport')
        .first()
        .then(doc => {
          return supertest(app)
            .delete(`/api/sports/delete/${doc.id}`)
            .expect(204);
        })
    });

    it('should respond with a 404 for an invalid id', function () {
      return supertest(app)
        .delete('/api/sports/delete/aaaaaaaaaaaaaaaaaaaaaaaa')
        .expect(404);
    });
  });
});
