// Handle login
function login() {
    // Get the email and password from the form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Sign in to Firebase with the email and password
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      // The user is signed in
      console.log("Usuário conectado: " + user.uid);
    }, function(error) {
      // The user failed to sign in
      console.log(error);
    });
  }
  