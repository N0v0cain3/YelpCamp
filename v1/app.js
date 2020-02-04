 var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("landing");
});
var campgrounds= [
    {name:"Salmon Creek",image:"https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"},
    {name:"Granite Hill",image:"https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name:"Mountain Goat's rest",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
]
app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});

});
app.get("/campgrounds/new",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});
app.post("/campgrounds",function(req,res){
res.send("lol");
})
app.listen(3000,function()
{
    console.log("server is running");
})