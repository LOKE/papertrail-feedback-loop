const qs = require('qs');

module.exports = buf => qs.parse(buf.toString('utf8'));
