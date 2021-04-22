let fsRoutes = require("express").Router();
const fs = require("fs");
let detailTrip = require("./2020/paths").detailTrip;
let trips = [];
let arr1 = [];
let arr2 = [];

//create an array of strings from the trips headsign

var createList = (arr) => {
  var collect = [];
  arr.map((el) => collect.push(el.trip_headsign.split("-")));
  var allRes = collect.flat().map((el) => el.trim());
  var res = [];
  for (var i = 0; i < allRes.length; i++) {
    if (!res.includes(allRes[i])) {
      res.push(allRes[i]);
    }
  }
  return res;
};

fsRoutes.get("/data/api/2020/routes/:id", (req, res) => {
  var id = req.params.id;
  trips = [];
  fs.readFile(detailTrip, async (error, data) => {
    if (error) {
      throw error;
    }
    let myData = data
      .toString()
      .split("\n")
      .map((el) => [el][0].split(","));
    for (var i = 1; i < myData.length; i++) {
      var obj = {};
      for (var j = 0; j < myData[i].length; j++) {
        obj[myData[0][j]] =
          (await myData[i][j].match(/^[0-9, .]+$/)) != null
            ? JSON.parse(myData[i][j])
            : myData[i][j].toLowerCase();
      }
      await trips.push(obj);
    }
    arr1 = [];
    arr2 = [];
    trips.map((el) => {
      if (el.trip_headsign) {
        el.trip_headsign.search("kai") == -1 ? arr1.push(el) : arr2.push(el);
      }
    });

    id == 0 ? res.send(createList(arr1)) : res.send(createList(arr2));
  });
});

module.exports = { fsRoutes };
