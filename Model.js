const connect=require('./DBconnection.js');
connect();
const mongoose=require('mongoose');
const Schema=new mongoose.Schema({

    Description:String
});
const Model=new mongoose.model('Tables',Schema,'Tables');
module.exports=Model;