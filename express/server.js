var usbserial = 'COM4';
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(usbserial, { baudRate: 115200 })
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
var temperature = "2";
parser.on('data', data => {
  console.log(data)
  if (data !== "led on" && data !== "led off") {
    temperature = data;
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
  port.write(req.body.light)
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ light: req.body.light });
});

app.get("/temperature", function (req, res) {
  port.write('temperature');
  setTimeout(() => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ temperature: temperature });
  }, 2000)

})

// finish by fallback
app.use(fallback("index.html", { root: root }));

//load server on port 8081
app.listen(8081);
//server ready
console.log("Serveur ok server on port 8081");
