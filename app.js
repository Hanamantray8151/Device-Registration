const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app =  express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-hanamantray:Test-123@cluster0.8ric1.mongodb.net/devicesDB",{useNewUrlParser:true,useUnifiedTopology: true});

const deviceSchema = new mongoose.Schema({
    name : String,
    id : Number,
    ram : String,
    mfg : String,
    model : String,
    os : String,
    storage : String,
    graphic : String
});

const Device = mongoose.model("Device",deviceSchema);

app.get("/",function(req,res){
    res.render("register");
});

app.get("/details",function(req,res){
    Device.find({},function(err,devices){
        if(err){
            console.log(err);
        }else{
            res.render("details",{getDevices : devices});
        }
    });
})

app.post("/regdevice",function(req,res){
    const device = new Device({
        name : req.body.deviceName,
        id : req.body.deviceId,
        ram : req.body.deviceRam,
        mfg : req.body.deviceMfg,
        model : req.body.deviceModel,
        os : req.body.deviceOs,
        storage : req.body.deviceStorage,
        graphic : req.body.deviceGraphic
    });
    device.save(function(err){
        if(!err){
            res.redirect("/details");
        }
    });
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server Started on Port 3000");
});
