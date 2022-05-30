const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
//this is how your database is coming in

router.get(`/`, (req, res) => {
  //console.log( `in /tasks GET`);
  const query = `
      SELECT * FROM "tasks";
      `;
  pool
    .query(query)
    .then((results) => {
      //console.log(results.rows);
      res.send(results.rows);
    })
    .catch((err) => {
      console.log(`ERROR with GET:`, err);
      res.sendStatus(500);
    });
});

router.post(`/`, (req, res) => {
  //console.log(`POST /items`, req.body);
  const query = `
    INSERT INTO "tasks"
    ("clean","day","hours_alotted", "job_done")
    VALUES ($1, $2, $3, $4);
    `;

  //setting what each of the headers of the database are
  // making them equal to values to scrub
  const sqlParams = [
    req.body.clean,
    req.body.day,
    req.body.hours_alotted,
    req.body.job_done,
  ];
  pool
    .query(query, sqlParams)
    .then((results) => {
      //console.log(`POST WENT THROUGH`, results);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`ERROR in POST`, err);
      res.sendStatus(500);
    });
});

router.delete(`/:deleteTasks`, (req, res) => {
  let testing = req.params.deleteTasks;
  //console.log("router.delete", testing);

  const sqlQuery = `
          DELETE FROM "tasks"
          WHERE "id" = $1;
          `;

  //scrubbing the tasks when deleting
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

router.put(`/:tasks`, (req, res) => {
  console.log(` in the router PUT`);

  const sqlQuery = `
  UPDATE "tasks"
  SET "job_done" = $2
  WHERE "id" = $1;
  `;
  //I tried $4 here but I don't understand why I had to set it to $2
  // I thought that the numbers generally lined up with
  // what I made them equal to up in the POST or does
  // that not really matter because they are scoped to
  // that post?
  const sqlParams = [req.params.tasks, req.body.job_done];
  console.log(req.params.tasks, req.params.job_done);
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`PUT updated failed`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
