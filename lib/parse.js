const qs = require('qs');

module.exports = buf => JSON.parse(qs.parse(buf.toString('utf8')).payload);
