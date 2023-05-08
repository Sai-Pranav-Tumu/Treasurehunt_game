// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIy-KLgSPK9L-yXQl_qHJ23nPQqrJVG5c",
  authDomain: "treasurehunt-8e510.firebaseapp.com",
  databaseURL: "https://treasurehunt-8e510-default-rtdb.firebaseio.com",
  projectId: "treasurehunt-8e510",
  storageBucket: "treasurehunt-8e510.appspot.com",
  messagingSenderId: "104749078457",
  appId: "1:104749078457:web:8be3ebfe61d45b74738868"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      level: 0
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
    
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    

    // Push to Firebase Database
    // database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    
    if (user.uid === "nElBiGpy2kORVnwxglLIMjAxXCD3") {
      window.location.replace("admin.html");
      window.history.forward();
      alert('Admin Logged In!!')
    } else {
      console.log(user.uid);
      localStorage.setItem("userId", user.uid);
      window.location.replace("home.html");
      window.history.forward();
      alert('User Logged In!!')
    }
    

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

