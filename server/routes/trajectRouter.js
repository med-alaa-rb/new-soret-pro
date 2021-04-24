let traject = require("express").Router();
const fs = require("fs");
let detailTrip = require("./2020/paths").detailTrip;
let trips = [];

//function to compare two object

let compareObj = (arr1, arr2, i, j) => {
  if (Object.values(arr1[i]).join("") == Object.values(arr2[j]).join("")) {
    return Object.keys(arr1[i]).join("");
  } else if (j == arr2.length - 1 && i == arr1.length - 1) {
    return null;
  } else if (j == arr2.length - 1) {
    return compareObj(arr1, arr2, i++, (j = 0));
  } else {
    return compareObj(arr1, arr2, i, j++);
  }
};

traject.post("/data/api/2020/UserTraject", async (req, res) => {
  console.log(req.body);
  var object = req.body;
  var urb = object.tripType == 0 ? false : true;
  trips = [];
  //create a JSON arr from trip.txt
  fs.readFile(detailTrip, async (error, data) => {
    var resultFounded = false;
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

    console.log(choice.length - 1);
    // create an array of trip_id and trip_headsign [{trip_id: trip_headsign}] and push the element that include user start postion
    var filterChoiceRes = [];
    let filterChoice = (arr, i, str) => {
      if (i == arr.length) {
        return filterChoiceRes;
      } else if (arr[i]["trip_headsign"].includes(str)) {
        var obj = {};
        obj[arr[i]["trip_id"]] = arr[i]["trip_headsign"];
        filterChoiceRes.push(obj);
        return filterChoice(arr, ++i, str);
      } else {
        return filterChoice(arr, ++i, str);
      }
    };
    let filtredChoiceArr = filterChoice(choice, 0, object.from);
    let filChoiceArr = filterChoice(choice, 0, object.to);
    var compare = compareObj(filtredChoiceArr, filChoiceArr, 0, 0);
    console.log(compare);
    res.send([filtredChoiceArr, filChoiceArr]);
  });
});

module.exports = { traject };
