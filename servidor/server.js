// Importação da biblioteca do express para dentro do nosso código
var express = require('express');
// Biblioteca que possibilita/libera o acesso a api por servidores externos
var cors = require('cors');
var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAapmnP7vOEhxZMNmt864_DwfUpE5dH1Y4",
  authDomain: "coachtools-76dd1.firebaseapp.com",
  databaseURL: "https://coachtools-76dd1.firebaseio.com",
  storageBucket: "coachtools-76dd1.appspot.com",
  messagingSenderId: "430657944313"
};
firebase.initializeApp(config);

var app = express();
app.use(cors());


// Biblioteca que possibilita a extração dos parâmetros enviados pelo app/website
// via body no formato json
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded

var infoUser;

//  ------------------         Funções         ------------------
var action = {};
action.newPostKey = function() {
  return firebase.database().ref().push().key;
};


//  ##################         EVENTS         ##################

//  ------------------         Detect a new user         ------------------
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // se existir um novo usuário então sera criado um novo ambiente user
    console.log("Detectado usuário online!");
    var ref = firebase.database().ref();
    var payload = {};
    var uid = user.uid;
    var dataUser = {
      nameUser : infoUser,
      emailUser : user.email,
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
app.post('/suaUrl', function (req, res) {
  res.send("ok");
})  //end of endpoint /suaUrl


//  ------------------         Get Form Teste Amor         ------------------
app.get('/loveTest', function (req, res) {
  var ref = firebase.database().ref("loveTest");
  ref.once('value')
    .then(function(snap) {
      res.send(
        snap.val()
      );
    });

})  //end of endpoint /loveTest

//  ------------------         Post Form Teste Amor         ------------------
app.post('/loveTest', function (req, res) {
  var ref = firebase.database().ref();
  var date = new Date();
  var loveTest = {
    date : {
      dia:date.getDate(),
      mes:date.getMonth(),
      ano:date.getFullYear()
    },
    title : req.body.titulo,
    grupoA : {
      A : req.body.grupoA.A,
      B : req.body.grupoA.B,
      C : req.body.grupoA.C,
      D : req.body.grupoA.D,
      E : req.body.grupoA.E
    },
    grupoB : {
      A : req.body.grupoB.A,
      B : req.body.grupoB.B,
      C : req.body.grupoB.C,
      D : req.body.grupoB.D,
      E : req.body.grupoB.E
    },
    grupoC : {
      A : req.body.grupoC.A,
      B : req.body.grupoC.B,
      C : req.body.grupoC.C,
      D : req.body.grupoC.D,
      E : req.body.grupoC.E
    },
    grupoD : {
      A : req.body.grupoD.A,
      B : req.body.grupoD.B,
      C : req.body.grupoD.C,
      D : req.body.grupoD.D,
      E : req.body.grupoD.E
    },
    grupoE : {
      A : req.body.grupoE.A,
      B : req.body.grupoE.B,
      C : req.body.grupoE.C,
      D : req.body.grupoE.D,
      E : req.body.grupoE.E
    }
  };
  var payload = {};
  var coacheeKey = "-KdbsGtnlr7TTABzk7P2"; //req.body.coacheeKey

  payload['loveTest/' + coacheeKey + '/'] = loveTest;
  ref.update(payload);
  res.send("Teste submetido com sucesso!");
})  //end of endpoint /testeAmor

//  ------------------         Solicitação dos daos de um Coach         ------------------
app.get('/profileCoach', function (req, res) {
  var ref = firebase.database().ref();

  ref.child('users').once('value')
    .then(function(snap) {
      res.send(
        snap.val()
      );
    });
})  //end of endpoint /profile

//  ------------------         Retorna o Coachees cadastrados         ------------------
app.get('/coachee', function (req, res) {
  var ref = firebase.database().ref("coachee");
  ref.once('value')
    .then(function(snap) {
      res.send(
        snap.val()
      );
    });
})  //end of endpoint /coachee

//  ------------------         Cadasstro de Coachee         ------------------
app.post('/cadCoachee', function (req, res) {
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.nome) {             erros.push("Nome não informado");   }
  if (!req.body.email) {            erros.push("Email não informado");   }
  if (!req.body.telefone) {         erros.push("Telefone não informado");   }
  if (!req.body.celular) {          erros.push("Celular não informado");   }
  if (!req.body.dataNascimento) {   erros.push("Data de Nascimento não informada");   }
  if (!req.body.profissao) {        erros.push("Profissão não informada");   }
  if (!req.body.empresa) {          erros.push("Empresa não informada");   }
  if (!req.body.estadoCivil) {      erros.push("Estado Civil não informado");   }
  if (!req.body.cep) {              erros.push("CEP não informado");   }
  if (!req.body.endereco) {         erros.push("Endereco não informado");   }
  if (!req.body.dataInicio) {       erros.push("Data Inicio não informado");   }
  if (!req.body.numeroSessoes) {    erros.push("Numero de Sessões não informada");   }
  if (!req.body.periodicidade) {    erros.push("Periodicidade não informado");   }
  if (!req.body.diaSemana) {        erros.push("Dia da Semana não informada");   }
  if (!req.body.valorPacote) {      erros.push("Valor do pocote não informada");   }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {
    var newPostKey = action.newPostKey();
    var dataClient = {
      nome : req.body.nome,
    	email : req.body.email,
    	telefone : req.body.telefone,
    	celular : req.body.celular,
    	dataNascimento : req.body.dataNascimento,
    	profissao : req.body.profissao,
    	empresa : req.body.empresa,
    	estadoCivil : req.body.estadoCivil,
    	cep : req.body.cep,
    	endereco : req.body.endereco,
    	dadosProcesso : {
    		dataInicio : req.body.dataInicio,
    		numeroSessoes : req.body.numeroSessoes,
    		periodicidade : req.body.periodicidade,
    		diaSemana : req.body.diaSemana,
    		valorPacote : req.body.valorPacote
	     }
    }
    var ref = firebase.database().ref();
    var payload = {};
    payload['coachees/' + newPostKey] = dataClient;
    ref.update(payload);

    res.send("ok");
  }

})  //end of endpoint /suaUrl

//  ------------------         Cadastro de usuário         ------------------
app.post('/cadCoach', function (req, res) {
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.telefone) {         erros.push("Telefone não informado");   }
  if (!req.body.celular) {          erros.push("Celular não informado");   }
  if (!req.body.dataNascimento) {   erros.push("Data de Nascimento não informada");   }
  if (!req.body.nichoAtuacao) {     erros.push("Nicho Atuacao não informado");   }
  if (!req.body.empresa) {          erros.push("Empresa não informada");   }
  if (!req.body.cep) {              erros.push("CEP não informado");   }
  if (!req.body.endereco) {         erros.push("Endereco não informado");   }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {

    var ref = firebase.database().ref();
    var payload = {};
    var dataUser = {
    	tel : req.body.telefone,
    	cel : req.body.celular,
    	datanasc : req.body.dataNascimento,
    	nicho : req.body.nichoAtuacao,
    	empresa : req.body.empresa,
    	cep : req.body.cep,
    	end: req.body.endereco
    };
    payload['coaches/'] = dataUser;
    ref.update(payload);

  }

  res.send("ok");
})  //end of endpoint /suaUrl

//  ------------------         Redefinição de senha         ------------------
app.post('/resetPassword', function (req, res) {
  var auth = firebase.auth();
  var emailAddress = req.body.email;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    res.send("Enviamos um email para você com as informações necessárias para obter nova senha!");
  }, function(error) {
    res.send(error);
  });
})  //end of endpoint /newpassword

//  ------------------         signOut         ------------------
app.post('/signout', function (req, res) {
  firebase.auth().signOut().then(function() {
    res.send("ok");
  }, function(error) {
    // An error happened.
  });
})  //end of endpoint /signout

//  ------------------         signInEmail         ------------------
app.post('/signin', function (req, res) {
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.email) {  erros.push("E-mail não informado"); }
  if (!req.body.password) {  erros.push("Senha não informada");  }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  }else{
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error Code: " + errorCode);
      console.log("Error Message: " + errorMessage);
      res.send(
        {
          error1 : errorCode,
          error2 : errorMessage
        }
      );
    });
    res.send("ok");
  }
})  //end of endpoint /signinEmail

//  ------------------         signUpEmail         ------------------
app.post('/signup', function (req, res) {
  var erros = []; // será preenchida com possiveis erros de autenticação

  if (!req.body.name) {   erros.push("Nome não informado");   }
  if (!req.body.email) {  erros.push("E-mail não informado"); }
  if (!req.body.password) {  erros.push("Senha não informada");  }

  if (erros.length > 0) {
    res.send( { status: false,  erros: erros  } );
  } else {
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            console.log('The password is too weak.');
            res.send('The password is too weak.');
        }else if (errorCode == 'auth/operation-not-allowed') {
          console.log('Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.');
          res.send('Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.');
        }else if (errorCode == 'auth/invalid-email') {
          console.log('Thrown if the email address is not valid.');
          res.send('Thrown if the email address is not valid.');
        }else if (errorCode == 'auth/email-already-in-use') {
          console.log('Thrown if there already exists an account with the given email address.');
          res.send('Thrown if there already exists an account with the given email address.');
        }
      }); //end firebase.auth

      infoUser = req.body.name
      res.send("ok");
    }; //end else
})  //end of endpoint /signupEmail

//  ------------------         app Listen - node         ------------------
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
