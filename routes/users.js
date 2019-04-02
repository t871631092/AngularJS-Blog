var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

var monk=require('monk');
var db=monk("localhost:27017/PapaBlog");


//查询是否注册
router.get('/:username', (req, res) => {
db.get('users').count({'username':req.params.username},(err,doc)=> res.json(doc));
console.log("username-check");
});

//注册
router.post('/register', (req, res) => {

//console.log(req.body.username);
db.get('users').insert({
  "username":req.body.username,
  "password":req.body.pw
},(err,doc)=>res.json(doc));
db.get('profile').insert({"username":req.body.username,"name":req.body.username},(err,doc)=>{console.log(err,doc);
});
});

//登陆
router.post('/login', (req, res) => {

 // console.log(req.body);
  
  console.log("loginpost");
  var username = req.body.username;
  var password = req.body.pw;
 
  db.get('users').findOne({'username':username},(err,doc)=>{
    if(username==doc.username&&password==doc.password){
      req.session.username=username;
      req.session.save();
      res.json({'result':0});
      console.log("session-save"+req.session.username);
    }
    else{
      res.json({'result':1});
    }



  });
  //db.get('users').insert({"username":req.params},(err,doc)=>res.json(doc))
  });
  
router.post('/changepassword', (req, res) => {
  if(req.session.username!="null"){
    var oldpassword=req.body.oldpw;
    var password=req.body.pw;
    var username=req.session.username;
    db.get('users').findOne({'username':username},(ree,doc)=>{
      if(oldpassword==doc.password){
        db.get('users').update({'username':username},{$set:{'password':password}},(err,doc)=>{
           res.json({'result':"修改成功"});
        });
      }
      else{
         res.json({"result":"密码错误或未知错误"});
      };
    });
  }
});



module.exports = router;
