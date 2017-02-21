angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAapmnP7vOEhxZMNmt864_DwfUpE5dH1Y4",
    authDomain: "coachtools-76dd1.firebaseapp.com",
    databaseURL: "https://coachtools-76dd1.firebaseio.com",
    storageBucket: "coachtools-76dd1.appspot.com",
    messagingSenderId: "430657944313"
  };
  firebase.initializeApp(config);

})

