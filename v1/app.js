 var express=require('express');
 var mongoose=require('mongoose');
var app=express();
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/yelp_camp");

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.use(express.static("public"))
app.get("/",function(req,res){
    res.render("landing");
}); 
var campgroundSchema=new mongoose.Schema({
    name : String,
    image : String,
    description : String 
}); 
var Campground=mongoose.model("Campground",campgroundSchema);
    // Campground.create({name:"Granite Hill",
    // image:"https://q-xx.bstatic.com/xdata/images/hotel/840x460/178852959.jpg?k=e968b270d8259ebbdedad907a5fedb57134ce3a111e276f9dcfa8aaf3dc987c5&o=",
    // description:"This is a huge granite hill, no bathrooms, No water Beautiful Granite"
    // },function(err,campground){
    // if(err)
    // {
    //     console.log(err);
    // }
    // else{
    // console.log("newly created campground : ");
    // console.log(campground);}
    // })
var campgrounds= [
    {name:"Salmon Creek",image:"https://images.unsplash.com/photo-1571069756236-9d9322054086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name:"Granite Hill",image:"https://q-xx.bstatic.com/xdata/images/hotel/840x460/178852959.jpg?k=e968b270d8259ebbdedad907a5fedb57134ce3a111e276f9dcfa8aaf3dc987c5&o="},
    {name:"Mountain Goat's rest",image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
]
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else{
              res.render("index",{campgrounds:allCampgrounds});
        }
    })
   

});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
    

});
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc};
   // campgrounds.push(newCampground);
   Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
   }) ;
   
})
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundCampground});
        }

    });
    
    

});
app.listen(3000,function()
{
    console.log("server is running");
})
