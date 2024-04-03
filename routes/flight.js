var express = require('express');
var pool = require('./pool');
var upload=require("./multer")
var router = express.Router();var LocalStorage =require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage('./scratch');


router.get('/displaybyid',function(req,res,next){
  pool.query('select F.*,(select s.statename from states s where  s.stateid=F.sourcestateid) as ss,(select C.cityname from city C where  C.cityid=F.sourcecityid) as sc,(select C.cityname from city C where  C.cityid=F.destinationcityid) as dc,(select s.statename from states s where  s.stateid=F.destinationstateid) as ds  from flights F where flightid=?',[req.query.flightid],function(error,result){
  
    if(error)
    {  console.log(error);
      res.render('displaybyflightid',{data:[]})
    }
    else{ 
      console.log(result)
      res.render('displaybyflightid',{data:result[0]});
    }
  }) 
})

router.get('/displayall', function(req, res, next) {
  var result= JSON.parse(localStorage.getItem('admin'))
  //console.log('xxxxxxxxxxxxxxxxxx',result)
  if(!result)
  {  res.render('loginpage',{msg: ''});}
 
  pool.query('select F.*,(select C.cityname from city  C where C.cityid=F.sourcecityid) as sc,(select C.cityname from city  C where C.cityid=F.destinationcityid) as dc from flights F',function(error,result){
  
    if(error)
    {  console.log(error);
      res.render('displayall',{data:[]})
    }
    else{ console.log(error)
      res.render('displayall',{data:result});
    }
  })

})
/* GET home page. */
router.get('/flight', function(req, res, next) {
  var result= JSON.parse(localStorage.getItem('admin'))
  //console.log('xxxxxxxxxxxxxxxxxx',result)
  if(result)
  { res.render('flightinterface'); }
  else
 { res.render('loginpage',{msg: ''}); }
});
router.get('/fetchallstates',function(req,res){

  pool.query('select * from states',function(error,result){

    if(error)
    {
      res.render(500).json([])
    }
    else{
      res.status(200).json(result)
    }
  })
})

  router.get('/fetchallcity',function(req,res){

    pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
  
      if(error)
      {console.log(error)
        res.render(500).json([])
      }
      else{
        res.status(200).json(result)
      }
    })
  })
  
    router.post('/addnewrecord',upload.single('logo'),function(req,res){
    console.log("body",req.body)
    console.log("file",req.files)
      
var fclass
if(Array.isArray(req.body.fclass))
{fclass=req.body.fclass.join('#')}
else
{
fclass=req.body.fclass
    }

var days
if(Array.isArray(req.body.days))
fclass=req.body.days.join('#')
else
days=req.body.days

      console.log(req.body)

     
      pool.query("insert into flights(flightid,companyname,sourcestateid,sourcecityid,destinationstateid,destinationcityid,status,flightclass,sourcetimings,destinationtiming,days,logo)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body. flightid,req.body.companyname,req.body.sourcestate,req.body.sourcecity,req.body.destinationstate,req.body. destinationcity,req.body.status,fclass,req.body. sourcetime,req.body.destinationtime,days,req.file.originalname],function(error,result){
      if(error)
      {
        console.log(error)
        res.render('flightinterface',{msg:'server error,record not submited'})
      }
      else
      {
        res.render('flightinterface',{msg:'record,record  submited'})
      }
    })
    
    })

  //=========================================================
  router.post('/editdeleterecord',function(req,res){
    console.log("body",req.body)
    if(req.body.btn=='edit')
{
var fclass
if(Array.isArray(req.body.fclass))
{fclass=req.body.fclass.join('#')}
else
{
fclass=req.body.fclass
    }

var days
if(Array.isArray(req.body.days))
fclass=req.body.days.join('#')
else
days=req.body.days

      console.log(req.body)

     
      pool.query("update flights set companyname=?,sourcestateid=?,sourcecityid=?,destinationstateid=?,destinationcityid=?,status=?,flightclass=?,sourcetimings=?,destinationtiming=?,days=? where flightid=?",[req.body.companyname,req.body.sourcestate,req.body.sourcecity,req.body.destinationstate,req.body.destinationcity,req.body.status,fclass,req.body. sourcetime,req.body.destinationtime,days,req.body.flightid],function(error,result){
      if(error)
      {
        console.log(error)
        res.redirect('/divyansh/displayall')
      }
      else
      {
        res.redirect('/divyansh/flightinterface')
      }
    })
  }
  else{
    
    pool.query("delete from flights where flightid=?",[res.body.flightid],function(error,result){
      if(error)
      {
        console.log(error)
        res.redirect('/divyansh/displayall')
      }
      else
      {
        res.redirect('/divyansh/flightinterface')
      }
    })
  }
    
    })
  
  
 



module.exports = router;