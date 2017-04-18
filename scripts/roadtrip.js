var config = {
    apiKey: "AIzaSyAFvIkXWFbo56ob8pYcDtsoRe0mG4gG3LA",
    authDomain: "roadtrip-4398d.firebaseapp.com",
    databaseURL: "https://roadtrip-4398d.firebaseio.com",
    projectId: "roadtrip-4398d",
    storageBucket: "roadtrip-4398d.appspot.com",
    messagingSenderId: "540869499583"
  };
  firebase.initializeApp(config);


  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});


  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});


  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});