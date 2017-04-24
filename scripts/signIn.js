//  firebase initialization code
var config = {
    apiKey: "AIzaSyBeeNYWaNWO0P9zd16ZEZDrNFRfeCRkIto",
    authDomain: "fir-intro-aaf02.firebaseapp.com",
    databaseURL: "https://fir-intro-aaf02.firebaseio.com",
    projectId: "fir-intro-aaf02",
    storageBucket: "fir-intro-aaf02.appspot.com",
    messagingSenderId: "144411755167"
  };
  firebase.initializeApp(config);

    /**
     * Handles the sign in button press.
     */
    function toggleSignIn(event) {

      event.preventDefault();
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('user-email').value;
        var password = document.getElementById('user-password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('sign-in').disabled = true;
    };

    /**
     * Handles the sign up button press.
     */
    function handleSignUp(event) {

      event.preventDefault();
      var email = document.getElementById('user-email').value;
      var password = document.getElementById('user-password').value;
      
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    };

    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
       
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          
          $(".welcome-message").show();
          $("#welcome-message").text(email);
          $("#sign-in").text("Sign Out");
          $("#user-email").addClass("hide");
          $("#user-password").addClass("hide");
          $("#new-user").addClass("hide");

          // [START_EXCLUDE]

        } else {
          // User is signed out.
          // [START_EXCLUDE]
        $(".welcome-message").hide();
        $("#sign-in").text("Sign In");
        $("#user-email").removeClass("hide").val('');
        $("#user-password").removeClass("hide").val('');
        $("#new-user").removeClass("hide");
        // $("#user-email").val('');
        // $("#user-password").val('');
        }
        // [START_EXCLUDE silent]
        document.getElementById('sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('new-user').addEventListener('click', handleSignUp, false);
    }

window.onload = function() {
      initApp();
  };

// ============================== End Auth function ====================
// =====================================================================
