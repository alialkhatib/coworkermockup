// var express  = require('express');
// var app      = express();
// var port     = process.env.PORT || 8000;

// app.listen(port);
// console.log('The magic happens on port ' + port);

var jade = require('jade')
var express = require('express');
var app = express();
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var port     = process.env.PORT || 8000;
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'jade'); // set up ejs for templating

app.get('/:company', function(req, res){
  res.render('index',
  //  
  // campaigns.forge({company:req.body.compaby}).fetchAll().then(function(campaignThings){
  //     res.render('index',
  //       {company:campaignThings})
  //   })
  {
    company:{
    "name": "Starbucks",
    "CEO": "someone",
    "campaigns": [
      "campaign1",
      "campaign2",
      "campaign3",
      ]
    }
  }

  /*
  {
  company: starbucks
  CEO: someone,
  campaigns: [
    campaign1
    campaign2
    campaign3
    ]
  }

  */
  )
});

app.listen(port);