'use strict';
//
const pg = require('pg');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();

const request = require('superagent');

const nasaURL = 'https://data.nasa.gov/resource/y77d-th95.json?$$app_token=nEby64d7CBdhgHwlQqYAxocCO&$limit=3000';

// const nasaURL = `https://data.nasa.gov/resource/y77d-th95.json?$$app_token=${process.env.NASA_TOKEN}&$limit=3000`;
// const conString = 'postgres://postgres:potatobabe@localhost:5432/meteors';
// const conString = 'postgres://postgres:1234@localhost:5432/meteors';
const conString = 'postgres://postgres:flight19@localhost:5432/meteors';
// const conString = 'postgres://postgres:1234@localhost:5432/meteors';

const conString = process.env.DATABASE_URL || 'postgres://postgres:hofbrau@localhost:5432/meteors';


const client = new pg.Client(conString);
let nasaData = [];

client.connect();
client.on('error', function(error) {
  console.error(error);
});
app.use(express.static('./public'));

app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));
loadDB();
function loadMeteors(){
  client.query('SELECT COUNT(*) FROM meteors')
  .then(result => {
    if(!parseInt(result.rows[0].count)){
  request.get(nasaURL)
  .then(res => {
    nasaData = res.body;
    nasaData.map(ele => {
            client.query(`
              INSERT INTO
              meteors(name, "year", mass, recclass, reclat, reclong)
              VALUES ($1, $2, $3, $4, $5, $6);
              `,
              [ele.name, ele.year, ele.mass, ele.recclass, ele.reclat, ele.reclong]
            ).catch(console.error);
          })
        }
      )}
  }).catch(err => console.error(err));
};
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
//
app.get('/meteors/decade', (req, response) => {
  client.query(
  `SELECT * FROM meteors
  WHERE "year" >= $1
  AND "year" < $2`, [req.headers.val, req.headers.val2])
  .then(result => response.send(result.rows))
  .catch(console.error);
})
app.get('/meteors/mass', (req, response) => {
  client.query(
    `SELECT * FROM meteors
    WHERE mass >= $1
    AND mass < $2`, [req.headers.val, req.headers.val2])
  .then(result => response.send(result.rows))
  .catch(console.error);
})

function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS
    meteors (
        id SERIAL PRIMARY KEY,
        name TEXT,
        "year" DATE,
        mass DECIMAL,
        recclass TEXT,
        reclat DECIMAL,
        reclong DECIMAL
    )`
  ).then(loadMeteors).catch(console.error);
}

app.get('/meteors', (request, response) => {
  client.query(`
    SELECT * FROM meteors;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});
