var usbserial = 'COM4';
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(usbserial, { baudRate: 115200 })
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
var temperature = "0";
var distance = "0";
parser.on('data', data => {
  console.log(data);
  var resp = JSON.parse(data);
  if (resp.commande === "temperature") {
    temperature = resp.result;
  } else if (resp.commande === "distance") {
    distance = resp.result;
  }
})

//import dependancies and prepare express server with angular app
var fallback = require("express-history-api-fallback");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var root = __dirname + "/ihmArduino/dist/ihmArduino";
app.use(express.static(root));

// all REST API
app.post("/light", function (req, res) {
  port.write(JSON.stringify({ commande: req.body.light, result: "" }));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ light: req.body.light });
});

app.post("/neopixel", function (req, res) {
  port.write(JSON.stringify({ commande: req.body.color, result: "" }));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ color: req.body.color });
});

app.get("/temperature", function (req, res) {
  port.write(JSON.stringify({ commande: "temperature", result: "" }));
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ temperature: temperature });
  }, 2000)

});

app.get("/distance", function (req, res) {
  port.write(JSON.stringify({ commande: "distance", result: "" }));
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ distance: distance });
  }, 2000)

});

// finish by fallback
app.use(fallback("index.html", { root: root }));

//load server on port 8081
app.listen(8081, '0.0.0.0');
//server ready
console.log("Server ok server on port 8081");
