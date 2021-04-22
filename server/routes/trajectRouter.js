let traject = require("express").Router();
const fs = require("fs");
let detailTrip = require("./2020/paths").detailTrip;
let trips = [];

traject.post("/data/api/2020/UserTraject", async (req, res) => {
  console.log(req.body);
  var object = req.body;
  var urb = object.tripType == 0 ? false : true;
  trips = [];
  //create a JSON arr from trip.txt
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
    let choice = [];
    //filter inside trip arr to get trip type ? urbain : interUrbain and push the result in choice array
    trips.map((el) => {
      if (el["trip_headsign"] && el["trip_headsign"].includes("kai") == urb) {
        choice.push(el);
      }
    });
    let simpleArr = [];

    console.log(choice[0]);
    // create an array of trip_id and trip_headsign [{trip_id: trip_headsign}] and push the element that include user start postion
    for (let i = 0; i < choice.length; i++) {
      if (choice[i]["trip_headsign"].includes(object.from)) {
        var obj = {};
        obj[choice[i]["trip_id"]] = choice[i]["trip_headsign"];
        simpleArr.push(obj);
      }
    }
    res.send(simpleArr);
  });
});

module.exports = { traject };
