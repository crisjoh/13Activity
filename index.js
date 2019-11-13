const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.json();

mongoose.connect('mongodb://localhost:27017/api', {useUnifiedTopology:true, useNewUrlParser:true});

const User = mongoose.model('user',{name: String, age: Number});

var app = express();

app.use(express.static(__dirname +'/dist/app'));

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.sendFile(__dirname +'/dist/app/index.html');
});

app.get('/users', (req, res) => {
    User.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/user', urlEncoded, (req, res) => {
    var user = new User({
        name: req.body.name,
        age: req.body.age
    });
    user.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/user/:id', urlEncoded, (req, res) => {
    User.updateOne({_id:req.params.id},{
        name: req.body.name,
        age: req.body.age
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});




const PORT = process.env.PORT || 80;

app.listen(PORT,()=>{
	console.log('Server running at port ${PORT}');
});