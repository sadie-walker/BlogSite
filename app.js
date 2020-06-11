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

//Restful Routes

app.get("/", function(req, res){
    res.redirect("/blogs");
})

//index route
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

//new route
app.get("/blogs/new", function(req,res){
    res.render("new");
})

//create route
app.post("/blogs", function(req,res){
    Blog.create(req.body.blog,function(err, newBlog){
        if(err){
            console.log(err)
        } else{
            res.redirect("/blogs");
        }        
    })  
})

//server config
app.listen(port,function(){
    console.log("server is listening");
})