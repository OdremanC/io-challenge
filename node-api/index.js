const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const morgan = require('morgan')
const cors = require('cors');
//requerimos el archivo de configuracion
const config = require('./config');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
const db = module.exports = {};

//configuramos mongo con los datos el archivo de config
mongoose.connect(config.mongo.url,config.mongo.options);
mongoose.Promise = Promise;
mongoose.connection
  .on('error', function(err) {
        console.log(err)
        process.exit(1);
  })
  .on('open', function(value) {
        console.log("open")
  });

require("./app/route")(app);
app.listen(config.port);

module.exports = app;