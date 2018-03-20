
const assert = require('assert');
const server = require("../index.js");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const service = require('../app/service/services.js');
chai.use(chaiHttp);
//const users = {_id: "5aabd3b312a5e10225b961d9"};
//const token  =  service.createToken(users);

describe('/GET users', () => {
  it('it should GET all the users', (done) => {
    chai.request(server)
      .get('/users')
        .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
  });
  it('it should GET single user', (done) => {
    chai.request(server)
      .get('/users/'+users._id)
        .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
  });

  //Endpoint ADD users
  it('it should POST the users', (done) => {
    let datos = {
      firstName:" Jose",
      lastName: "Garcia",
      userName:"test",
      password:"123456",
      email: "test@gmail.com",
      perfil: "test"
    }
    chai.request(server)
    .post('/users')
      .send(datos)
        .set('Authorization', token)
          .end((err,res) =>{
            res.should.have.status(200);
              res.body.should.be.a('object');
            done();
          });     
  });
    //endpoint DELETE user
  /*it('it should DELETE user', (done) => {
    chai.request(server)
      .delete('/users/'+users._id)
        .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
  });*/
});

