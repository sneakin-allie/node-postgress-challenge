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

app.get('/api/sports', (req, res) => {
    SportsService.getSports(
        req.app.get('db')
    )
    .then(sports => {
        res.json(sports)
    })
})

app.delete('/api/sports/delete/:sport_id', (req, res) => {
    const { sport_id } = req.params;

    // make sure the sport_id is valid
    if(!SportsService.includes(sport_id)) {
        return res
            .status(404)
            .send('Valid sport id required');
    }
    res.json(sports);
});

app.listen( PORT, () => {
    console.log( `Server listening at http://localhost:${PORT}` );
});

module.exports = app;
