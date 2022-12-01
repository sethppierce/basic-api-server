'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const notFound = require('./handlers/404');
const errorHandler = require('./handlers/500');
const petRouter = require('./routes/pets');
const gameRouter = require('./routes/games');
const logger = require('./middleware/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(petRouter);
app.use(gameRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!!!!');
});


// Error Handlers
app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('listening on port' , PORT));
}

module.exports = { start, app };
