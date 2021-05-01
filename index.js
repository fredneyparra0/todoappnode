const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

const url = 'mongodb://localhost/todoapp';

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true})
try {
    console.log('connect to database');
}catch (error){
    console.log(error)
}


app.use(express.static(__dirname + '/public'))
app.use('/', require('./routers/router'));

app.listen(port, () => {
    console.log(`server run in port ${port}`);
})