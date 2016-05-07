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
app.set('view engine', 'jade');



app.get('/data/:company',function(req,res){
  res.sendFile(__dirname+'/public/data.json'); // should replace this with access to your data
})

app.get('/causes/:company_name', function(req, res){
  request(req.protocol+'://'+req.headers.host+'/data/example', // see above
    function(err,response,body){
      res.render('index', {
        company:JSON.parse(body)
    })
})
});

app.listen(port);