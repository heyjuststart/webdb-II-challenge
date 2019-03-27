const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const zoosRouter = require('./zoos/router');
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/zoos', zoosRouter);
server.use('/', (req, res) => res.send('API up and running!'));
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
