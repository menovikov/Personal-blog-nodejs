var pg = require('pg');
var conString = "postgres://postgres:000000@localhost/blogdb";

var client = new pg.Client(conString);

client.connect();

module.exports = client;
