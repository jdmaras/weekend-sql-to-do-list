const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pool = require("./modules/pool");
const port = 5000;
app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(`/tasks`, (req, res) => {
  //console.log( `in /tasks GET`);
  const query = `
    SELECT * FROM "tasks";
    `;
  pool
    .query(query)
    .then((results) => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      console.log(`ERROR with GET:`, err);
      res.sendStatus(500);
    });
});

app.post(`/tasks`, (req, res) => {
  console.log(`POST /items`, req.body);
  const query = `
  INSERT INTO "tasks"
  ("clean","day","hours_alotted")
  VALUES ($1, $2, $3);
  `;
  const sqlParams = [req.body.clean, req.body.day, req.body.hours_alotted];
  pool
    .query(query, sqlParams)
    .then((results) => {
      console.log(`POST WENT THROUGH`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`ERROR in POST`, err);
      res.sendStatus(500);
    });
});

app.delete(`/:tasks`, (req, res) => {
  console.log("app.delete", req.params.tasks);

  const sqlQuery = `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `;
  const sqlParams = [req.params.tasks];
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      console.log(`in delete pool.query.then`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`DELETE failed`, err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`I'M READY - SPONGEBOB PORT`, port);
});
