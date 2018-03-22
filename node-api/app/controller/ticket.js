'use strict';
const Ticket    = require('../model/ticket');
const Promises = require('promise');

exports.index = (data) => {
  return new Promise((resolve, reject) => {
    Ticket.find()
      .exec((err, tickets) => {
        if (err) return reject({ code: 500, error: err });

        resolve(tickets)
      });
  });
};


exports.create = (data) => {
  return new Promise((resolve, reject) => {
    Ticket.findOne().sort('-createdOn').exec((error, lastTicket) => {
      if(error) return reject({ code: 404, error })

      let code =  lastTicket ? lastTicket.code + 1 : 1;

      let payload = Object.assign(data.body, {code})

      Ticket.create(payload, (err, ticket) => {
        if (err) return reject({ code: 500, error: err });
        resolve(ticket.toJSON());
      }); 
    });
  });
}