const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitterclone');

var USERschema = mongoose.Schema({
    username : String,
    name : String,
    email : String,
    tweets : [ {
        tweetId : String
    }]
})

var USER = mongoose.model('user', USERschema);
module.exports = USER;