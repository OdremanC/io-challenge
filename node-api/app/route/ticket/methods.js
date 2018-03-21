'use strict';
var UserCtrl = require("../../controller/ticket");
const ticket = require("../../model/ticket");


exports.list = (req, res, next) => {
  UserCtrl.index(req).then((data) =>{
    res.send(data).status(200);
  }, (err) => {
    console.error(err);
    res.send(err.code || 500, err.error || err);
  });
}

exports.create = (req, res) => {
  UserCtrl.create(req).then((data) => {
    res.send(data).status(200);
  }, (err) => {
    console.error(err);
    res.send(err.code || 500, err.error || err);
  });
}