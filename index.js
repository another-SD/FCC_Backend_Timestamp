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

app.get("/api", (req, res) => {
  a = new Date();
  b = a.toUTCString()
  c = Date.parse(b)
  res.json({"unix": c, "utc": b});
})

app.get("/api/:date", (req, res) => {
  let DATE = req.params.date; // it is already converted to a string
  // The problem is timestamp cannot be converted to date
  if(isNaN(DATE)){ // Not a number = true => string => of type 2015-25-12
    
    // DATE = DATE.endsWith('Z') ? DATE : DATE + 'Z';
    // new Date = (UTC Date + Local time zone)Time (GMT+TimeZone)Details
    // it correctly interprets current Date, but if any other date is written
    // new Date.toUTCStr = Input Date - Local Time

    // if Z is written at end, then it tell the server to return only UTC date
    // it tells the server that it is already calibrated to UTC

    // what happens is that "new Date()" always considers/incl local time zone
    // when that time is converted to "toUTCString()", then it subtracts
    // local time zone => suppose "new Date().toUTCString()" gives 31 Dec 1969
     
    // but when we write Z at end of date, it tells him that it is already 
    // utc time. so it doesn't subtract anything

    // convert it to date that is global time
    a = new Date(DATE).toUTCString();
  } else { // if its a number, then its a time stamp
    a = new Date(parseInt(DATE)).toUTCString();
  }

  if (a == "Invalid Date") {res.json({error: "Invalid Date"})}
  b = Date.parse(a);
  res.json({"unix": b, "utc": a});
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
