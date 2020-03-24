 var express=require('s');
 var mongoose=require('mongoose');
var app=express();
var mongoose=require('mongoose');
var Campground=require('./models/campground');
var seedDB=require('./seeds');
seedDB();
 var Comment=require('./models/comment');
// var Campground=require('./models/campground');
mongoose.connect("mongodb://localhost/yelp_camp");

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
    Campground.find({},function(err,allCampgrounds){
        if(err)
        {
            console.log(err);
        }
        else{
              res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })
   

});
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
    

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
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground:foundCampground});
        }

    });
    
    

});

//===============================
//       COMMENTS ROUTES
//===============================

app.get("/campgrounds/:id/comments/new",function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
  
});

app.post("/campgrounds/:id/comments",function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
    
            
}
        
    });
    //create new comment

    
            //connect new comment to campground
           //redirect campground show page
});
    
app.listen(3000,function(){
    console.log("server is running");
});
