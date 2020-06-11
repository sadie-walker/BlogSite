const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express;
const port = process.env.PORT || 3000; 

app.set("view engine", "ejs");

app.listen(port,function(){
    console.log("server is listening");
})