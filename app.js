const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000; 

//App Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/blogs");

//Mongoose Model Config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    dateCreated: {type: Date, default: Date.now} 
})

const Blog = mongoose.model("Blog", blogSchema); 

//seed data
Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    body: "BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah",
})

//Restful Routes
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err)
        {
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    })
})

app.listen(port,function(){
    console.log("server is listening");
})