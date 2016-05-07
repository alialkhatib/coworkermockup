var jade = require('jade')
var request= require('request')
var express = require('express');
var app = express();
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var port     = process.env.PORT || 8000;
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms


var exampleData=
  {
    "name": "Starbucks",
      "CEO": "someone",
      "campaigns": [{
        "id":"campaign1",
        "name":"Starbucks: Tips for Bar",
        "Description":"I would like for a tip jar to be placed at hand off so that we have a chance of gaining more tips. Especially for the baristas who are speedy and accurate on bar. It will also motivate them to improve their customer service at hand off.",
        "signatures":7,
        "goal":100,
        "img":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg",
        "creator":"Amanda Villot"
      },{
        "id":"campaign2",
        "name":"Starbucks: Tips for Bar2",
        "Description":"I would like for a tip jar to be placed at hand off so that we have a chance of gaining more tips. Especially for the baristas who are speedy and accurate on bar. It will also motivate them to improve their customer service at hand off.",
        "signatures":7,
        "goal":100,
        "img":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg",
        "creator":"Amanda Villot"
      }]
  };


app.set('view engine', 'jade'); // set up ejs for templating


app.get('/data/:company',function(req,res){
  if (req.params.company=="example") {
      res.json(exampleData)
    } else {
        res.send(null)
    }
})

app.get('/causes/:company_name', function(req, res){
  // console.log(req.params.company_name)
  request(req.protocol+'://'+req.headers.host+'/data/example', // this is bad, isn't it?
    function(err,response,body){
      res.render('index', {
        company:JSON.parse(body)
    })
})
});

app.listen(port);