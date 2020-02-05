 var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("landing");
});
var campgrounds= [
    {name:"Salmon Creek",image:"https://images.unsplash.com/photo-1571069756236-9d9322054086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name:"Granite Hill",image:"https://q-xx.bstatic.com/xdata/images/hotel/840x460/178852959.jpg?k=e968b270d8259ebbdedad907a5fedb57134ce3a111e276f9dcfa8aaf3dc987c5&o="},
    {name:"Mountain Goat's rest",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
]
app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});

});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
    

});
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})
app.listen(3000,function()
{
    console.log("server is running");
})