const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 

app.use(express.static('server/public'));


const port = 5000;

app.listen(port, () => {
    console.log(`I'M READY - SPONGEBOB PORT`, port)
})