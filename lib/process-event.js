const got = require('got');

const messageRe = /(\S*)$/

function getHostname(str) {
  const match = messageRe.exec(str);

  return match && match[1];
}

module.exports = event => {
  const message = event.message;
  const hostname = event.hostname;

  const fullHostname = getHostname(message);
  const checkUrl = `http://${fullHostname}:8500/v1/agent/check/update/papertrail-feedback`;
  const output = `passing - hostname:${hostname} fqdn:${fullHostname}`;

  return got.put(checkUrl, {
    Status: 'passing',
    Output: output
  })
  .then(() => console.log(output))
  .catch(err => {
    console.log(`error ${fullHostname} - ${err.message}`);
  })
}
