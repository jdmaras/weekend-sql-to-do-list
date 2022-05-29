const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get(`/`, (req, res) => {
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

router.post(`/`, (req, res) => {
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

router.delete(`/:deleteTasks`, (req, res) => {
  let testing = req.params.deleteTasks;
  console.log("app.delete", req.params.deleteTasks);

  const sqlQuery = `
          DELETE FROM "tasks"
          WHERE "id" = $1;
          `;
  const sqlParams = [testing];
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      console.log(`in delete pool.query.then`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`DELETE failed - server side`, err);
      res.sendStatus(500);
    });
});

app.put(`/:tasks`, (req, res) => {
  console.log (` in the router PUT`);

  const sqlQuery = 
})

module.exports = router;
