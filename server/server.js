const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pool = require("./modules/pool");
const port = 5000;

app.use(express.static("server/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = require("./routes/router");

app.use("/tasks", router);

app.listen(port, () => {
  console.log(`I'M READY - SPONGEBOB PORT`, port);
});
