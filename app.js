require( 'dotenv' ).config();
const express = require( 'express' );
const { PORT, DATABASE_URL } = require( './config' );
const knex = require( 'knex' );
const { SportsService } = require( './services/sport-service' );

const db = knex({
    client: 'pg',
    connection: DATABASE_URL
});

const app = express();

app.set( 'db', db);

/* Your code goes here */

app.listen( PORT, () => {
    console.log( `Server listening at http://localhost:${PORT}` );
});

module.exports = app;
