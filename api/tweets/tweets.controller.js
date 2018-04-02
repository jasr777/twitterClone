/*
GET /api/tweets => getAll
GET /api/tweets/:id => getTweetById
POST /api/tweets => create Tweet
*/
var functions = require('../utils/functions');
var updateTweets = require('../users/users.controller').updateUserTweets;

var tweets = [
    {
        id : "pr5xw",
        text : "soy el primer twit" ,
        owner: "uno",
        createdAt : Date.now()
    },
    {
        id: 1,
        text: "soy el segundo twit",
        owner: "dos",
        createdAt: Date.now()
    }
]


module.exports = {
    getAll : getAll,
    getTweetById : getTweetById,
    createTweet : createTweet,
    getTweetsByUser : getTweetsByUser
}
function getAll(req,res) {
    res.json(tweets);

}

function getTweetById(req,res) {
    const tweetToFind = req.params.id;
    console.log(tweetToFind);
    console.log(tweets);
    let twit = tweets.find(tweet => tweet.id == tweetToFind);
    console.log(twit);
    if (twit) {
        res.json(twit);
    } else {
        res.status(404).send("The tweet you asked for doesn't exist");
    }

}
function createTweet(req,res) {
    console.log('Post request for tweets');
    if (req.body.text.length === 0) {
        return res.status(400).send("Tweet is empty");
    }
    const newTweet = {
        text : req.body.text,
        owner : req.body.owner,
        id : functions.getRandomID(),
        createdAt : Date.now(),
    }
    console.log(newTweet);
    tweets.push(newTweet);
    updateTweets(newTweet);    
    res.status(200).send("Tweet created successfully");

}

function getTweetsByUser(user) {
    let tweetList = [];

    tweets.forEach(tweet => {
        console.log("Tweets" ) ;
        console.log(tweet);
        user.tweets.forEach(tweetId => {
            console.log("Tweet id ")
            console.log(tweetId);
            if (tweetId == tweet.id) {
                tweetList.push(tweet);
            }
        })
    })
    return tweetList;

}