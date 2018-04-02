
/******
 *  USER CONTROLLER 
 * 
* GET  /api/users => getAll
* GET /api/users/:username => getUser
* POST /api/users => createUSer
* DELETE /api/users/:username => deleteUser
* PATCH /api/users/:username => updateUser
*********/
var users = [
    {
        username : "uno",
        name : "uno",
        email : "uno@uno.com",
        tweets : ["pr5xw"]
    },
    {
        username: "dos",
        name: "dos",
        email: "doso@dos.com",
        tweets: ["1"]
    }
];
module.exports = {
    getAll : getAll,
    getUser : getUser,
    getUserTweets : getUserTweets,
    createUser : createUser,
    deleteUser : deleteUser,
    updateUser : updateUser,
    updateUserTweets : updateUserTweets   
}

function getAll( req, res ) {
    console.log("get request all users");
    res.json(users);
    
}

function getUser( req, res ) {
    const userToFind = req.params.username;
    const user  = users.find( usr => usr.username === userToFind);
    
    if (user ){
        res.json(user);
        
    }  else { 
        return res.status(400).send("User doesn't exist");
    }
}

function getUserTweets (req, res) {
    console.log(req.params);    
    const userToFindTweets = req.params.username;
    const user = users.find( usr => usr.username == userToFindTweets);
    console.log(`user to find tweets ${userToFindTweets}`);
    console.log(user);
    if (user) { 
        console.log(user);
        let tweets = getTweetsByUser(user);
        res.json(tweets);
    } else {
        res.status(404).send("User not found");
    }
}

function createUser ( req, res) {
    if  (req.body.username.length === 0) {
        return res.status(400).send("Username is empty");
    }
    
    if  (req.body.email.length === 0) {
        return res.status(400).send("User email is empty");
    }
    
    if (users.findIndex( usr => req.body.username === usr.username) >= 0 ){
        return res.status(400).send("Username already exists");
    }
    const newUser = req.body;
    newUser.tweets = [];
    console.log(newUser);
    users.push(newUser);
    res.json(newUser);
}

function deleteUser(req,res) {
    const userToRemove = req.params.username;
    console.log(userToRemove);
    
    if (userToRemove.length >= 0) {
        users = users.map(usr => userToRemove != usr.username);
        console.log(users);
        return res.status(200).send(`User ${userToRemove} was removed succesfully`);
    } else {
        return res.status(400).send(`User doesn't exists!`);
    }
}

function updateUser(req, res) {
    const userToUpdate = req.params.username;
    console.log(req.params);
    const newName = req.params.newname;
    const newMail = req.params.newMail;
    const user = users.find(user => user.username === userToUpdate);
    
    if (user) {
        if ( userToUpdate ) {
            console.log("changing username");
            user.username = newName;
            console.log(user);
            console.log(users);
            return res.status(200).send("User name updated successfully");
        }
        
        if (req.body.email ) {
            console.log("changing email");
            user.email = req.body.newEmail;
            console.log(user);
            return res.status(200).send("User email updated successfully");
        }
    } else {
        return res.status(404).send("User doesn't exists");
    }
    
}

function updateUserTweets(tweet) {
    console.log("Updating user tweets : ")
    console.log(tweet);
    let userToUpdate = users.find(usr => usr.username == tweet.owner);
    console.log("User to update");
    console.log(userToUpdate);
    // Actualizar los twits del usuario
    users.forEach(usr => {
        if (usr.username == userToUpdate.username) {
            console.log("user after update");
            usr.tweets.push(tweet.id);
            console.log(usr);
        }
    })
}
var getTweetsByUser = require('../tweets/tweets.controller').getTweetsByUser;