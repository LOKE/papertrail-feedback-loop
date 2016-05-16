const http = require('http');
const getRawBody = require('raw-body');

const parseJson = require('./lib/parse');
const processEvent = require('./lib/process-event');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  getRawBody(req)
  .then(parseJson)
  .then(body => {
    return Promise.all(body.events.map(event => processEvent));
  })
  .then(() => {
    res.statusCode = 200;
    res.end('success');
  })
  .catch(err => {
    res.statusCode = 500;
    res.end('failed');
    console.log(err.stack);
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
