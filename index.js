/**
 * Collect logs, organize by type, and programatically flush to a single
 * endpoint.
 *
 * @author Wells Johnston <wells@littlstar.com>
 */

var http = require('superagent');

/**
 * `Lager' constructor
 *
 * @api public
 * @constructor
 */

module.exports = Lager;

function Lager(opts) {

  if (!(this instanceof Lager)) {
    return new Lager(opts);
  }

  this.host = opts.host;
  this.data = {};
};

/**
 * Stores data in memory to be logged. Optionally flush the log to the
 * endpoint right away.
 *
 * @api public
 * @param {string} endpoint The type of log.
 * @param {object} data The payload to send to the endpoint.
 * @param {boolean} [flush] If true, send the logs immediately.
 */

Lager.prototype.log = function(endpoint, data, flush) {

  if (typeof flush == 'undefined') flush = false;

  if (!this.data[endpoint]) {
    this.data[endpoint] = [data];
  } else {
    this.data[endpoint].push(data);
  }

  if (flush) this.flush();
};

/**
 * flush
 *
 * Send the stored log data to the backend server, which will store
 * the log data to the respective endpoints.
 *
 * @api public
 * @param {string} [endpoint]
 */

Lager.prototype.flush = function(endpoint) {

  var dataToLog = null;
  if (typeof endpoint == 'undefined') {
    dataToLog = this.data;
    this.data = {};
  } else {
    dataToLog = {};
    dataToLog[endpoint] = this.data[endpoint];
    delete this.data[endpoint];
  }

  http
    .post(this.host)
    .send({
      payload: dataToLog
    })
    .set('Accept', 'application/json')
    .end(function(e, r) {});
};
