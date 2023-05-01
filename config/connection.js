const { connect, connection } = require('mongoose');

connect('mongodb://localhost/BookFace');

module.exports = connection;