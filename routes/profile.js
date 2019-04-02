var express = require('express');
var router = express.Router();

var monk=require('monk');
var db=monk("localhost:27017/PapaBlog");

router.get('/', (req, res,next) => {
    res.render("profile",{
        title:"个人空间"
    });
});

router.get('/resume',(req,res)=>{
    
    if(req.session.username!=null)
    {
    db.get('profile').find({'username':req.session.username},(err,doc)=>{ 
        res.json(doc);
        console.log("get resume success ID:"+req.session.username);
        
    });
    

    }
});
router.post('/resume', (req, res) => {
    db.get('profile').update({'username':req.session.username},{'username':req.session.username,'name':req.body.name,'birth':req.body.birth,'region':req.body.region,'sign':req.body.sign},(err,doc)=>{
         res.json({'result':"修改成功"});
         console.log("post resume success");
    });
});

module.exports=router;