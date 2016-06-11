/**
 * Created by dave on 2/10/2016.
 */
var express = require('express');
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
module.exports = express.Router();

module.exports.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
