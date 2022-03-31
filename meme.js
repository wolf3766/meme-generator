const express = require("express");
const bodyparser=require("body-parser");
const mongoose = require("mongoose");
//const { listen } = require("express/lib/application");
const ejs=require("ejs");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb+srv://skc3766:1234@cluster0.wsew7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const items={
    name: String,
    description: String,
    URL: String
} 

const item=mongoose.model("item",items);

 app.get("/",function(req,res){
     res.render("home");
 });

app.get("/stream",function(req,res){
    res.render("stream");
});

app.post("/stream",function(req,res){
   // console.log(req.body);
    var newitem= new item({
        name: req.body.fname,
        description: req.body.description,
        URL: req.body.meme_address 
    });
     newitem.save(function(err,result){
         if(err){
             console.log(err);
         }else{
             console.log("success");
             res.redirect("/image_pre");
         }
     });
});

app.get("/image_pre",function(req,res){
   // console.log(item.find());
  // res.render("image_pre");
    item.find(function(err,newlist){
       // console.log(newlist);
        if(!err){
        res.render("image_pre",{
            list: newlist 
        });
    }
    });
});

app.listen(3000,function(){
    console.log("working on port 3000");
});