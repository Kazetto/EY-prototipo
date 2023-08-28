// Handle login
function login() {
    // Get the email and password from the form
    var email = document.getElementById("input_usuario").value;
    var password = document.getElementById("input_senha").value;
  
    // Sign in to Firebase with the email and password
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      // The user is signed in
      console.log("Usuário conectado: " + user.uid);
    }, function(error) {
      // The user failed to sign in
      console.log(error);
    });
  }