// Initialize Firebase
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

      // prevents referesh the page
      event.preventDefault();

      // determines wheter if the user already signed in or not
      if (firebase.auth().currentUser) {
        
        // [START signout]
        firebase.auth().signOut();
       
        // [END signout]

      // if user is not signed in
      } else {

        // grabs the value inside inputs 
        var email = document.getElementById('user-email').value;
        var password = document.getElementById('user-password').value;
        
        // if user type email less than 4 characters will get alert
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        // if user type password less than 4 characters will get alert
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }

        // Signs in with email and pass.
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

          // when user clicks signed in the button will be disabled
          document.getElementById('sign-in').disabled = false;
          // [END_EXCLUDE]
        });    
        // [END authwithemail]
      }

      // when user clicks signed out the button will be abled
      document.getElementById('sign-in').disabled = true;
    };

    /**
     * Handles the sign up button press.
     */
function handleSignUp(event) {

      // prevents referesh the page
      event.preventDefault();

      // grabs the value inside inputs 
      var email = document.getElementById('user-email').value;
      var password = document.getElementById('user-password').value;

      // if user type email less than 4 characters will get alert
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }

      //if user type password less than 4 characters will get alert
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      // Signs in with email and pass.
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
    };// ending createUser funtion

function initApp() {

      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
       
        // if there is user signed in
        if (user) {

          // grabs data from auth
          var displayName = user.displayName;
          var email = user.email;
          var uid = user.uid;
          
          // manipulates html
          $(".welcome-message").show();
          $("#welcome-message").text(displayName);
          $("#sign-in").text("Sign Out");
          $("#user-email").addClass("hide");
          $("#user-password").addClass("hide");
          $("#new-user").addClass("hide");
          $(".input-group-addon").addClass("hide");

            //** this is where will update the database begins usally will be
            //** happening once when user just registered
            //** (The reason why it will be happening only once because
            //** once user regiters there is no displayName value
            //** once user type the value of displayName this call back will
            //** stop happening)

            // checks if displayName = 'null'
            if(!displayName){
                
                // creating initial variable for ruling while loop
                var grabName = false;
                
                  while(grabName == false) {
                    
                    // creates popup for asking user's name
                    displayName = prompt("One more step! What is your name?");
                      
                      // if user doesn't type anything will call back this loop again
                      if (displayName == '') {
                        grabName = false;
                      }

                      // if user clicks cancel will call back this loop again
                      else if (!displayName) {
                        grabName = false;
                      }

                      // if user types something will stop calling this loop
                      // and updates database 
                      else {

                        // updates auth profile 
                        user.updateProfile({
                          displayName: displayName,
                        }).then(function() {
                           // Update successful.
                        }, function(error) {
                            // An error happened.
                        });

                        // updates realtime database 
                        firebase.database().ref().child('users').child(uid).set({
                          name: displayName,
                          userId: uid,
                          userEmail: email
                        });
                            // edits welcome text
                            $("#welcome-message").text(displayName);

                            // change to variabel to 'true' for stop this loop
                            grabName = true;
                        }

                  }; //end while loop
            }
          // [START_EXCLUDE]

          // if there is no user signed in
        } else {

          // User is signed out.
          // [START_EXCLUDE]
          // manipulates html
        $(".welcome-message").hide();
        $("#sign-in").text("Sign In");
        $("#user-email").removeClass("hide").val('');
        $("#user-password").removeClass("hide").val('');
        $("#new-user").removeClass("hide");
        $(".input-group-addon").removeClass("hide");
        
        }
        // [START_EXCLUDE silent]
        // if there is user signed in the "sign in" button will be disabled
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