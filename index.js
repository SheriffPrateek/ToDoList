
const express=require('express');
const connect=require('./DBconnection.js');
const model=require('./Model.js');
const bodyParser=require("body-parser");

connect();
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


var ans;
app.get("/home",async (req,resp)=>
{
    ans=await model.find({});
    resp.render('Template',{ans});
});

app.get("/create",async (req,resp)=>{
    
    
    if(req.query.Note!=""){      
    const obj=new model({
        "Description":req.query.Note
        }
    );
    const res=await obj.save();
    
    }
    resp.redirect("/home");           // to redirect to home page.
});

app.post("/crud/:id",async(req,resp)=>{
    const id=req.params.id; 
    if(req.body.Edit!=null)
    {
        const desc=await model.updateOne({_id:id},
            {$set:{
                'Description':req.body.description
            }}
            
            );
            resp.redirect("/home"); 
        
    }
    else{
        const del=await model.deleteOne({_id:id});
        resp.redirect("/home"); 
    }   
});

app.listen(3000);