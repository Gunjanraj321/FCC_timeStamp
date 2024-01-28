// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let responseObject = {};

app.get("/api", (req, res)=>{
  responseObject = {};
  let date= new Date();
  responseObject['unix'] = date.getTime();
  responseObject['utc'] = date.toUTCString();
  res.json(responseObject);
})
app.get("/api/:date", (req, res)=>{
  responseObject = {};
  let date = req.params.date;
  let date_obj = new Date(date);
  if(date_obj.toString() === "Invalid Date"){
    date_obj = new Date(parseInt(date));
  }
  if(date_obj.toString() === "Invalid Date"){
    res.json({error: "Invalid Date"});
  }
  else{
    responseObject['unix'] = date_obj.getTime();
    responseObject['utc'] = date_obj.toUTCString();
    res.json(responseObject);
  }
})
app.get("/api/:date?", (req, res)=>{
  responseObject = {};
  let date = req.params.date;
  if(date.includes('-')){
    //date string
    responseObject['unix'] = new Date(date).getTime();
    responseObject['utc'] = new Date(date).toUTCString();
  }else{
    //timestamp
    date = parseInt(date);
    responseObject['unix'] = new Date(date).getTime();
    responseObject['utc'] = new Date(date).toUTCString();
  }
  res.json(responseObject);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
