//Teste Amor
$scope.getData = function(grupo1a, grupo1b, grupo1c, grupo1d, grupo1e, grupo2a, grupo2b, grupo2c, grupo2d, grupo2e, grupo3a, grupo3b, grupo3c, grupo3d, grupo3e, grupo4a, grupo4b, grupo4c, grupo4d, grupo4e, grupo5a, grupo5b, grupo5c, grupo5d, grupo5e) {

  var grupo1 = [grupo1a, grupo1b, grupo1c, grupo1d, grupo1e];
  var grupo2 = [grupo2a, grupo2b, grupo2c, grupo2d, grupo2e];
  var grupo3 = [grupo3a, grupo3b, grupo3c, grupo3d, grupo3e];
  var grupo4 = [grupo4a, grupo4b, grupo4c, grupo4d, grupo4e];
  var grupo5 = [grupo5a, grupo5b, grupo5c, grupo5d, grupo5e];
  var soma = [];
  var typeName = ['tipoA','tipoB','tipoC','tipoD','tipoE'];

  for(var i=0 ; i<grupo1.length ; i++){
    var x = '{\"';
    x += typeName[i];
    x += '\" : ';
    x += grupo1[i] + grupo2[i] + grupo3[i] + grupo4[i] + grupo5[i];
    x += '}';
    soma[i] = JSON.parse(x);
  };
  //TO DO 01 - ordenar o vetor soma em ordem decrescente

  console.log(soma);
};
//TO DO 02 - criar uma função para o botão submit para a url do server
$scope.goToCloud = function(grupo1a, grupo1b, grupo1c, grupo1d, grupo1e, grupo2a, grupo2b, grupo2c, grupo2d, grupo2e, grupo3a, grupo3b, grupo3c, grupo3d, grupo3e, grupo4a, grupo4b, grupo4c, grupo4d, grupo4e, grupo5a, grupo5b, grupo5c, grupo5d, grupo5e) {
  var obj = {
    titulo : "nome do form",
    grupoA : {
      A : grupo1a,
      B : grupo1b,
      C : grupo1c,
      D : grupo1d,
      E : grupo1e
    },
    grupoB : {
      A : grupo2a,
      B : grupo2b,
      C : grupo2c,
      D : grupo2d,
      E : grupo2e
    },
    grupoC : {
      A : grupo3a,
      B : grupo3b,
      C : grupo3c,
      D : grupo3d,
      E : grupo3e
    },
    grupoD : {
      A : grupo4a,
      B : grupo4b,
      C : grupo4c,
      D : grupo4d,
      E : grupo4e
    },
    grupoE : {
      A : grupo5a,
      B : grupo5b,
      C : grupo5c,
      D : grupo5d,
      E : grupo5e
    }
  };

  $http({
      method: 'POST',
      url: 'http://localhost:3000/loveTest',
      data:obj
    }).then(function successCallback(response) {
      $scope.flagenergy = response.data;
      document.getElementById("flagColor").style.background = response.data.flag;
      }, function errorCallback(response) {
      });

};



// var grupo1 = [2, 3, 2, 2, 5];
// var grupo2 = [4, 3, 4, 3, 4];
// var grupo3 = [2, 5, 5, 1, 5];
// var grupo4 = [1, 3, 4, 3, 4];
// var grupo5 = [2, 3, 3, 2, 5];
// var soma = [];
// var typeName = ['tipoA','tipoB','tipoC','tipoD','tipoE'];
//
//
// for(var i=0 ; i<grupo1.length ; i++){
//   var x = '{\"';
//   x += typeName[i];
//   x += '\" : ';
//   x += grupo1[i] + grupo2[i] + grupo3[i] + grupo4[i] + grupo5[i];
//   x += '}';
//   soma[i] = JSON.parse(x);
// };
//TO DO - ordenar

// console.log(soma);
