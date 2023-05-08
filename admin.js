// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCIy-KLgSPK9L-yXQl_qHJ23nPQqrJVG5c",
  authDomain: "treasurehunt-8e510.firebaseapp.com",
  projectId: "treasurehunt-8e510",
  storageBucket: "treasurehunt-8e510.appspot.com",
  messagingSenderId: "104749078457",
  appId: "1:104749078457:web:8be3ebfe61d45b74738868",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();


const dbRef = firebase.database().ref('users');
dbRef.once('value', function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      // Add the user data to the table
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = '<td>' + childData.full_name + '</td>' +
                            '<td>' + childData.email + '</td>' +
                            '<td>' + childData.level + '</td>';
                            
      document.getElementById('users-table').appendChild(tableRow);
   });
});


function logout() {
  // Replace the current history state with a new one
  history.replaceState(null, null, location.href);

  // Navigate to a new page and replace the current page in the browser's history
  window.location.replace("index.html");
}