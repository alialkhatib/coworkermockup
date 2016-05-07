var jade = require('jade')
var request= require('request')
var express = require('express');
var app = express();
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var port     = process.env.PORT || 8000;
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

app.use('/public',express.static(__dirname + '/public'));
app.use('/image',express.static(__dirname + '/image'));

var exampleData=
  {
    "name": "Starbucks",
    "imgurl":"http://russell.heistuman.com/wordpress/wp-content/uploads/2011/01/starbucks-ring.jpg",
    "stats": {
      "Industry":"Food and Beverage",
      "Type":"Public - traded as SBUX (NASDAQ)",
      "Revenue":"$16.447 billion (2014)",
      "Workforce":"191,000 employees (2014)",
      "Number of Locations":"23,768",
      "Headquarter Location":"Seattle, Washington",
      "CEO":"Howard Schultz",
    },
    "url":"http://www.starbucks.com",
    "campaigns": [{
      "id":"campaign1",
      "url":"/causes/Stsdsdfsfw",
      "name":"1Starbucks: Tips for Bar",
      "Description":"1I would like for a tip jar to be placed at hand off so that we have a chance of gaining more tips. Especially for the baristas who are speedy and accurate on bar. It will also motivate them to improve their customer service at hand off.",
      "signatures":17,
      "goal":1100,
      "img":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg",
      "creator":"1Amanda Villot"
    },{
      "id":"campaign2",
      "url":"/causes/Stsdsdfsfw",
      "name":"2Starbucks: Tips for Bar2",
      "Description":"2I would like for a tip jar to be placed at hand off so that we have a chance of gaining more tips. Especially for the baristas who are speedy and accurate on bar. It will also motivate them to improve their customer service at hand off.",
      "signatures":27,
      "goal":2100,
      "img":"https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg",
      "creator":"2Amanda Villot"
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