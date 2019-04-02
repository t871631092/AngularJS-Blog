var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'PapaBolg' 
    });
});




router.get('/session', (req, res) => {
  if(req.session.username!=null)
  {
     res.json(req.session.username);
     console.log('session get'+req.session.username);
  }
  else
  {
    res.json("null");
    console.log('session unknow users')
  }
});


router.get('/logout',(req,res) => {
  req.session.username=null;
  req.session.save();
   res.redirect('/');
  console.log("logout");
});


//=================blog============================================

var monk=require('monk');
var db=monk("localhost:27017/PapaBlog");



router.get('/edit/add', (req, res) => {
    res.render('blogadd',{
      title:'新建博客',
      papablog:''
    });
  });
  
  
router.post('/edit/add', (req, res) => {
    var name;
    db.get('profile').findOne({'username':req.body.username},(err,doc)=>{
      name=doc.name;

      db.get('blog').insert({'blogname':req.body.blogname,'html':req.body.html,'author_username':req.body.username,'author_name':name},(err,doc)=>{
        console.log(doc._id);
        
        res.json(doc._id);
        console.log('post blog success');
     });
   

    });
  

  
});
  
  
  
  
  router.get('/edit/:blog', (req, res) => {
    console.log('blog edit id:'+req.params.blog);
    
    db.get('blog').find({'_id':req.params.blog},(err,doc)=>{
        if(doc.length>0)
        {   
          res.render('blogedit',{
          title:doc[0].blogname,
          papablog:""
          });
        }
        else{
          res.render('blog',{
            title:'404 not found',
            papablog:""
          });
        };
  
      });
  
  });
  
  
  
  router.get('/edit/get/:blog', (req, res) => {
    console.log('blog get id:'+req.params.blog);
    
    db.get('blog').find({'_id':req.params.blog},(err,doc)=>{
        if(doc.length>0)
        {   
           res.json(doc);
        }
        else{
          res.json('null'
          );
        };
  
      });
  
  });
  
  
  
  
  
  
  router.post('/edit/blog', (req, res) => {
    var name;
    db.get('profile').findOne({'username':req.body.username},(err,doc)=>{
      name=doc.name;
      db.get('blog').update({'_id':req.body._id},{'blogname':req.body.blogname,'html':req.body.html,'author_username':req.body.username,'author_name':name},(err,doc)=>{
        console.log(req.body._id+'edit success'+doc+err);
        res.json(req.body._id);
     });
    });
  

  
  
  });
  
  
  
  
  
  router.get('/blog/:blog', (req, res) => {
    console.log('blog view id:'+req.params.blog);
    
    db.get('blog').find({'_id':req.params.blog},(err,doc)=>{
        if(doc.length>0)
        {
            res.type('html');
          res.render('blog',{
          title:doc[0].blogname,
          papablog:doc[0].html
          });
        }
        else{
          res.render('blog',{
            title:'404 not found',
            papablog:''
          });
        };
  
      });
  
  });


  router.get('/list', (req, res) => {
    db.get('blog').find({},{'_id':1,'blogname':1,'author_name':1,'skip':parseInt(req.query.skip),'limit':parseInt(req.query.limit)},(err,doc)=>{
       res.json(doc);
    });
  });
  
  router.get('/plist', (req, res) => {
    if(req.session.username!=null){
    db.get('blog').find({'author_username':req.session.username},{'_id':1,'blogname':1,'author_name':1},(err,doc)=>{
      res.json(doc);
   });
  }
  });

  router.get('/getall', (req, res) => {
    db.get('blog').count({},(err,doc)=>{
      res.json(doc);
    });
  
  });






module.exports = router;
