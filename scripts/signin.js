// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6N9cba7yjSP_5USpvGZVCNccs79pLYBg",
    authDomain: "roadtripauth.firebaseapp.com",
    databaseURL: "https://roadtripauth.firebaseio.com",
    projectId: "roadtripauth",
    storageBucket: "roadtripauth.appspot.com",
    messagingSenderId: "506049831436"
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
          bootbox.alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          bootbox.alert('Please enter a password.');
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
            bootbox.alert('Wrong password.');
          } else {
            bootbox.alert(errorMessage);
          }
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
        bootbox.alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        bootbox.alert('Please enter a valid password.');
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
          bootbox.alert('The password is too weak.');
        } else {
          bootbox.alert(errorMessage);
        }
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
          var displayName = user.email.substring(0,user.email.indexOf('@'));
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
         
          $("#welcome-message").show();
          $("#welcome-message").text(email);
          $("#sign-in").text("Sign Out");
          $("#user-email").addClass("hide");
          $("#user-password").addClass("hide");
          $("#new-user").addClass("hide");
          $(".input-group-addon").addClass("hide");
            //upload data to FB         
            firebase.database().ref('users/' + uid).set({
                uid: uid,
                displayName: displayName,
                email: email,
           })
        
          // [START_EXCLUDE]

        } else {
          // User is signed out.
          // [START_EXCLUDE]
        $(".welcome-message").hide();
        $("#sign-in").text("Sign In");
        $("#user-email").removeClass("hide").val('');
        $("#user-password").removeClass("hide").val('');
        $("#new-user").removeClass("hide");
        $(".input-group-addon").removeClass("hide");
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
//upload searches to FB
$("#search-button-submit").on("click", function(event) {
    event.preventDefault();
    var userSearched = $("#search-term").val().trim();
    firebase.database().ref("user-searches/").push({
    recentlySearched: userSearched
    })
});