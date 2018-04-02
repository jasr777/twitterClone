/*
// DUDAS : -> En el patch, postman no pilla el return 

Primera API : 

Funciones : 
[x] Crear un nuevo usuario
[x] Borrar un usuario [TODO : Hacer petición en el front]
[x] Editar el email de un usuario o su nombre (Patch) [TODO : Hacer petición en el front]
[] Subir un tweet nuevo por parte de un usuario
[] Buscar un tweet por su ID
[ ] Obtener los tweets ordenados ascendente o descendente por la fecha de subida
 
* Controlar que la API no falla en ningun momento, controlar campos vacíos, request invalidas
y devolver el error en la respuesta y el código correcto para el caso que aplica.


*/



var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

/*
 User structure : {

    username* : string <uniq>
    name? : string
    email* :string
    tweets : [{tweet}]
 }

 Tweet Structure  :{

     id* : string <uniq>
     text* : string
     owner : string <ID>
     createdAt: timestamp
    }
    
    */
   
   var users = [
       {
           username : "uno",
           name : "uno",
           email : "uno@uno.com",
           tweets : ["hola"]
       },
       {
           username: "dos",
           name: "dos",
           email: "doso@dos.com",
           tweets: ["adios"]

       }
   ];

   var tweets = [
       {
           id : 0,
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
   var tweetId = tweets.length++;
   
   app.get('/users', (req,res) => {       
       console.log("get /users");
       res.json(users);
    })

    app.get('/users/:username', (req, res) => {
        const userToFind = req.params.username;

        if (users.findIndex( usr => usr.username === userToFind) >= 0 ){
            console.log("User exists");
        }  else { 
            return res.status(400).send("User doesn't exist");
        }

    })

    app.post('/users' , (req, res) => {
        
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
        users.push(newUser);
        res.json(newUser);
    })

    app.delete('/users/:username', (req,res) => {
        const userToRemove = req.params.username;
        console.log(userToRemove);

        if (userToRemove.length >= 0) {
            users = users.map(usr => userToRemove != usr.username);
            console.log(users);
            return res.status(200).send(`User ${userToRemove} was removed succesfully`);
        } else {
            return res.status(400).send(`User doesn't exists!`);
        }

    })

    app.patch('/users/:username', (req,res) => {
        const userToUpdate = req.params.username;
        const user = users.find(user => user.username === userToUpdate);

        if (user) {
            if ( req.body.username ) {
                console.log("changing username");
                user.username = req.body.username;
                console.log(user);
                console.log(users);
                return res.status(200).send("User name updated successfully");
            }

            if (req.body.email ) {
                console.log("changing email");
                user.email = req.body.email;
                console.log(user);
                return res.status(200).send("User email updated successfully");
            }
        } else {
            return res.status(404).send("User doesn't exists");
        }
    })


    // Tweets 


    /*s
     Tweet Structure  :{

     id* : string <uniq>
     text* : string
     owner : string <ID>
     createdAt: timestamp
    }

    var t = { 
        id = "1",
        text ="hola soy un tweet",
        owner ="uno",
        createdAt : Date.now()
    }
    
    
    */
    app.get('/tweets' , (req,res) => {
        res.json(tweets);
    })
    app.get('/tweets/:id' , (req,res) => {
        const tweetToFind = req.params.id;

        let twit = tweets.find(tweet => tweet.id == twit.id);

        if (twit) {
            res.json(twit);
        }

    })
/*     app.get('/tweets/:owner' , (req,res) => {
        const ownerToFind = req.params.owner;

        let user = users.find(usr => usr.username == ownerToFind);
        if (user) {
            res.json(user.tweets);
            
        } else {
            return res.status(400).send("User doesn't exists");
        }
    })
 */
    app.post('/tweets', (req,res) => {
        console.log('Post request for tweets');
        if (req.body.text.length === 0) {
            return res.status(400).send("Tweet is empty");
        }

        const newTweet = {
            text : req.body.text,
            owner : req.body.owner,
            id : getRandomID(),
            createdAt : Date.now(),
        }

        let userToUpdate = users.find(usr => usr.username == newTweet.owner );
        userToUpdate.tweets.push(newTweet);
        tweets.push(newTweet);
        console.log("User to update");
        console.log(userToUpdate);
        // Actualizar los twits del usuario
        users.forEach (usr => {
            if (usr.username == userToUpdate.username) {
                console.log("user after update");
                usr = Object.assign({},userToUpdate);

                console.log(usr);
            }
        })
        console.log(users);
        res.status(200).send("Tweet created successfully");


    })

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

function getRandomID() {
    return Math.random().toString(36).substring(7);
}
