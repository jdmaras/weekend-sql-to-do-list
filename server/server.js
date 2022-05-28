const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const pool = require('./modules/pool');
const port = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get(`/tasks`, (req, res) => {
    console.log( `in /tasks GET`);
    const query = `
    SELECT * FROM "tasks";
    `;
    pool.query(query).then ((results) => {
        res.send(results.rows);
    }).catch ((err) => {
        console.log( `ERROR with GET:`, err);
        res.sendStatus(500);
    })
})


app.listen(port, () => {
    console.log(`I'M READY - SPONGEBOB PORT`, port)
})