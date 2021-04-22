var path = require("express").Router();

let stopPaths = require("path").resolve(__dirname, "../2020/stops.txt");

let stopTimes = require("path").resolve(__dirname, "../2020/stop_times.txt");

let detailTrip = require("path").resolve(__dirname, "../2020/trips.txt");

let shapes = require("path").resolve(__dirname, "../2020/shapes.txt");

let pics = require("path").resolve(
  __dirname,
  "../../../src/assets/welcomeIcon"
);

module.exports = { path, stopPaths, stopTimes, detailTrip, shapes, pics };
