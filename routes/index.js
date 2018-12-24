var express = require('express');
var router = express.Router();
var data = require('../public/javascripts/data')
var https = require('https')
let Article = require('../models/article')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/banner', function(req, res, next) {
  res.send({ url: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Ec7hwrKKxik52rser/4k-technology-abstract-animation-background-seamless-loop-blue-color_vxpy6lnfx__F0000.png' });
});
router.get('/article/data',function(req,res){
  let article = Article.find({},function(err,articles){
    if(err){
      console.log(err)
    }else{
    res.send({articles:articles,title: 'Articles'})
  }})
})

let findArticle = (id,success,fail) => {
  Article.find(id,function(err,article){
    if(err){
      fail('No Data')
    }else{
    success(article)
  }})
}

router.get('/article/data/:id',function(req,res){
  findArticle({_id: req.params.id}, function(article){
    res.send(article)
  }, function(err){
    console.log(err)
    res.send([])
  })
})
//edit
router.put('/article/data/edit/:id',function(req,res){
  console.log(req.body)
  Article.update({_id: req.params.id},req.body ,function(err,art){
    if(err){
    console.log(err);
      res.send(err);
    } else{
        res.send(art);
      }
    })
})

let deleteArticle = (req,success, failure) => {
  Article.remove({_id: req.params.id} ,function(err,art){
    if(err){
      console.log(err);
      failure("Fail")
    } else{
      setTimeout(function(){
        success('Deleted')
      }, 5000)
    }
  })
}

//delete
router.delete('/article/data/delete/:id',function(req,res){
  let faliure = function (failureResult){
    console.log(failureResult)
  }
  let success = function(successResult) { 
    console.log(successResult)
    res.send(successResult)
  }

  deleteArticle(req,success,faliure)
  
})
//add
router.post('/article/add',function(req,res){
  // article.title= req.body.title;
  // article.body=req.body.body;
  // article.author = req.body.author;
  // article.price = req.body.price;
  console.log(req.body)
  Article.create(req.body ,function(err){
    if(err){
    console.log(err);
      res.send(err);
    } else{
        res.send("Done");
      }
    })
})
// router.get('/countries/all',function(req,res,next){
//   let promise = new Promise((resolve,reject) => {
//   https.get('https://restcountries.eu/rest/v2/all', (resp) => {
//       let data = '';

//       // A chunk of data has been recieved.
//       resp.on('data1', (chunk) => {
       

//         data += chunk;
//       });
      

//       // The whole response has been received. Print out the result.
//       resp.on('end', () => {
//        // console.log(JSON.parse(data).explanation);
//        resolve(data)
//       });
//       promise.then((data) => {
//         resp.send(data);

//       })
      

//     }).on("error", (err) => {
//       console.log("Error: " + err.message);
//     });
    
// })
// promise.then(countries => res.send(countries)
// )
// })
// router.route('/').post(function(req,res){

// })
let fetchCountries =  (success) => {
  console.log('inside fetch')

  https.get('https://restcountries.eu/rest/v2/all', (resp) => {
    console.log('inside http')
  let data =''
  console.log(resp.statusCode)
    
    resp.on('data', (chunk) => {
      data += chunk;
    });  
    resp.on('end', () => {
      console.log("Api Ended")
    });
    resp.on('close', function(){
      success(data)
    })
})}

router.get('/countries/all',function(req,res){
  console.log('inside router')
fetchCountries(function(data){
  res.send(data)
})
})




module.exports = router;
