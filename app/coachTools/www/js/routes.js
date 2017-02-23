angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



      .state('menu.painelDeControle', {
        url: '/page1',
        views: {
          'side-menu21': {
            templateUrl: 'templates/painelDeControle.html',
            controller: 'painelDeControleCtrl'
          }
        }
      })

      .state('tutorial', {
        url: '/page19',
        templateUrl: 'templates/tutorial.html',
        controller: 'tutorialCtrl'
      })

      .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.criarConta', {
        url: '/page4',
        views: {
          'side-menu21': {
            templateUrl: 'templates/criarConta.html',
            controller: 'criarContaCtrl'
          }
        }
      })

      .state('login', {
        url: '/page5',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('menu.esqueceuASenha', {
        url: '/page11',
        views: {
          'side-menu21': {
            templateUrl: 'templates/esqueceuASenha.html',
            controller: 'esqueceuASenhaCtrl'
          }
        }
      })

      .state('menu.cadastro', {
        url: '/page6',
        views: {
          'side-menu21': {
            templateUrl: 'templates/cadastro.html',
            controller: 'cadastroCtrl'
          }
        }
      })

      .state('menu.cadastroDeCoachee', {
        url: '/page7',
        views: {
          'side-menu21': {
            templateUrl: 'templates/cadastroDeCoachee.html',
            controller: 'cadastroDeCoacheeCtrl'
          }
        }
      })

      .state('menu.meuPerfil', {
        url: '/page17',
        views: {
          'side-menu21': {
            templateUrl: 'templates/meuPerfil.html',
            controller: 'meuPerfilCtrl'
          }
        }
      })

      .state('coachees', {
        url: '/page16',
        templateUrl: 'templates/coachees.html',
        controller: 'coacheesCtrl'
      })

      .state('planejamentoDeSessEs', {
        url: '/page8',
        templateUrl: 'templates/planejamentoDeSessEs.html',
        controller: 'planejamentoDeSessEsCtrl'
      })

      .state('menu.ferramentas', {
        url: '/page9',
        views: {
          'side-menu21': {
            templateUrl: 'templates/ferramentas.html',
            controller: 'ferramentasCtrl'
          }
        }
      })

      .state('menu.relatRios', {
        url: '/page10',
        views: {
          'side-menu21': {
            templateUrl: 'templates/relatRios.html',
            controller: 'relatRiosCtrl'
          }
        }
      })

      .state('menu.testeAmor', {
        url: '/page12',
        views: {
          'side-menu21': {
            templateUrl: 'templates/testeAmor.html',
            controller: 'testeAmorCtrl'
          }
        }
      })



      .state('menu.testeRepres', {
        url: '/page14',
        views: {
          'side-menu21': {
            templateUrl: 'templates/testeRepres.html',
            controller: 'testeRepresCtrl'
          }
        }
      })


      .state('menu.testeTempo', {
        url: '/page15',
        views: {
          'side-menu21':{
        templateUrl: 'templates/testeTempo.html',
        controller: 'testeTempoCtrl'
          }
        }
      })

      .state('page', {
        url: '/page13',
        templateUrl: 'templates/page.html',
        controller: 'pageCtrl'
      })

    $urlRouterProvider.otherwise('/page5')



  });
