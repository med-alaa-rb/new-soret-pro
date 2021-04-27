let traject = require("express").Router();
const fs = require("fs");
let detailTrip = require("./2020/paths").detailTrip;
let trips = [];

//function to compare two object

let compareObj = (arr1, arr2, i, j) => {
  if (arr1.length) {
    return null;
  } else if (
    Object.values(arr1[i]).join("") == Object.values(arr2[j]).join("")
  ) {
    return Object.keys(arr1[i]);
  } else if (j == arr2.length - 1 && i == arr1.length - 1) {
    return null;
  } else if (j == arr2.length - 1) {
    return compareObj(arr1, arr2, i++, (j = 0));
  } else {
    return compareObj(arr1, arr2, i, j++);
  }
};

//search additional stops if compare return null

let searchAlter = (arr1, arr2, obj) => {
  console.log("obj", obj);
  var arr = [arr1, arr2].flat();
  var arr1 = [];
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    arr1.push(Object.values(arr[i])[0].split("-"));
  }
  arr1 = arr1.flat();
  for (var i = 0; i < arr1.length; i++) {
    console.log(obj.from == arr1[i]);
    console.log(obj.from, arr1[i]);
    if ([obj["to"], obj["from"]].indexOf(arr1[i]) === -1) {
      if (result.indexOf(arr1[i]) === -1) {
        result.push(arr1[i]);
        console.log("pushed", arr1[i]);
      }
    }
  }
  return [(obj.from, result[0])];
};

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

    // create an array of trip_id and trip_headsign [{trip_id: trip_headsign}] and push the element that include user start postion

    var filterRes = [];

    let filterChoice = (arr, i, str) => {
      if (i == arr.length - 1) {
        return filterRes;
      } else if (arr[i]["trip_headsign"].includes(str)) {
        var obj = {};
        obj[arr[i]["trip_id"]] = arr[i]["trip_headsign"];
        filterRes.push(obj);
        return filterChoice(arr, ++i, str);
      } else {
        return filterChoice(arr, ++i, str);
      }
    };

    var filtredChoiceArr = await filterChoice(choice, 0, object.from);
    filterRes = [];
    var filChoiceArr = await filterChoice(choice, 0, object.to);
    var compare = await compareObj(filtredChoiceArr, filChoiceArr, 0, 0);
    console.log("compare", compare);
    var x = searchAlter(filtredChoiceArr, filChoiceArr, object);
    console.log("searchAlter", x);

    // compare ? res.send(compare) : res.send([]);
    res.send(x);
  });
});

module.exports = { traject };
