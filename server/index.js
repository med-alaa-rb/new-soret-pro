var express = require("express");
var app = express();
var fsRoutes = require("./routes/fsRoutes").fsRoutes;
var trajectRouter = require("./routes/trajectRouter").traject;
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", fsRoutes);
app.use("/", trajectRouter);

var port = process.env.PORT || 2700;

app.listen(port, () =>
  console.log(`app is listnening to http://192.168.43.52:${port}/`)
);
