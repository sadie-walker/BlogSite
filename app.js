const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express;
const port = process.env.PORT || 3000; 

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blogs");

app.listen(port,function(){
    console.log("server is listening");
})