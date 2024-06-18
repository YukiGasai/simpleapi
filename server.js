require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: 'movies',
    port: 5432,
  });
  

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/films', (req, res) => {
    pool.query('SELECT * FROM films', (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({error: error.message});
          return;
        }
        res.status(200).json(results.rows);
      });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})