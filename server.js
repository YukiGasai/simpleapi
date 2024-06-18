require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;


const connectionString = process.env.DB_URL;

const pool = new Pool({connectionString: connectionString});

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