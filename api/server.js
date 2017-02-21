// Importação da biblioteca do express para dentro do nosso código
var express = require('express');
// Biblioteca que possibilita/libera o acesso a api por servidores externos
var cors = require('cors');
var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

var app = express();
app.use(cors());

// Biblioteca que possibilita a extração dos parâmetros enviados pelo app/website
// via body no formato json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded

//  ##################         EVENTS         ##################


//  ------------------         Detect a new user         ------------------
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // se existir um novo usuário então sera criado um novo ambiente user
    console.log("Detectado cadastro de novo usuário!");
    var ref = firebase.database().ref();
    var payload = {};
    var uid = user.uid;
    var dataUser = {
      nameUser : user.displayName,
      emailUser : user.email,
      photoURL : user.photoURL
    };
    payload['users/' + uid + '/'] = dataUser;
    ref.update(payload);

  } else {
    console.log();
    console.log("onAuthStateChanged: " , user);
  }
});

//  ##################         END_POINTS (URLs)         ##################

//  ------------------         nome do seu endpoint         ------------------
app.get('/suaUrl', function (req, res) {
  res.send("ok");
})  //end of endpoint /suaUrl

//  ------------------         signOut         ------------------
app.post('/signout', function (req, res) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
})  //end of endpoint /signout

//  ------------------         signInEmail         ------------------
app.post('/signinEmail', function (req, res) {
  firebase.auth().signInWithEmailAndPassword("email", "password").catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error Code: " + errorCode);
    console.log("Error Message: " + errorMessage);
  });
})  //end of endpoint /signinEmail

//  ------------------         signUpEmail         ------------------
app.post('/signupEmail', function (req, res) {
  // req.body.nome é uma variavel enviada no corpo da requisição pelo usuário
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.nome) {                         erros.push("Nome não informado");   }
  if (!req.body.email) {                        erros.push("E-mail não informado"); }
  if (!req.body.senha || !req.body.re_senha) {  erros.push("Senha não informada");  }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.senha).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: " + errorCode);
        console.log("Error Message: " + errorMessage);
      }); //end firebase.auth
    }; //end else
})  //end of endpoint /signupEmail

//  ------------------         app Listen - node         ------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
