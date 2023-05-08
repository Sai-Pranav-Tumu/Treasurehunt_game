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

const auth = firebase.auth();

var database = firebase.database();

let currentForm = 1;
let numberOfForms = 5;
let formAnswers = {
  form1: "abraham lincon",
  form2: "salva",
  form3: "sunken",
  form4: "vajranabha"
};
var tt;

const userId = localStorage.getItem('userId'); // Replace with the actual user ID

firebase.database().ref(`users/${userId}`).once("value")
  .then((snapshot) => {
    const userData = snapshot.val();
    tt=userData.level;
    console.log(tt);
  })
  .catch((error) => {
    console.error(error);
  });

function showForm(formId) {
  if (formId === `form${currentForm}`) {
    document.getElementById(formId).style.display = "block";
  } else {
    alert(`This is a DeadEnd Please complete Level ${currentForm}`);
  }
}

function showMessage() {
  document.getElementById("myModal").style.display = "block";
}

function hideMessage() {
  document.getElementById("myModal").style.display = "none";
}

// Sliding puzzle
let size = 4;
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;

let buttonContainer = document.getElementById('tiles');

// Keyboard controls
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 40;
const DOWN_ARROW = 38;
window.onkeydown = function (event) {
  if (event.keyCode === RIGHT_ARROW) {
    swap(highlighted + 1);
  } else if (event.keyCode === LEFT_ARROW) {
    swap(highlighted - 1);
  } else if (event.keyCode === UP_ARROW) {
    swap(highlighted + size);
  } else if (event.keyCode === DOWN_ARROW) {
    swap(highlighted - size);
  }
};

newGame();

function newGame() {
  loadTiles(size);
  setTimeout(() => {
    shuffle();
  }, 500);
}

// Create buttons
function loadTiles(n) {
  for (let b = 1; b <= numberOfTiles; b++) {
    var newTile = document.createElement('button');
    newTile.id = `btn${b}`;
    newTile.setAttribute('index', b);
    newTile.innerHTML = b;
    newTile.classList.add('btn');
    newTile.addEventListener('click', function () {
      swap(parseInt(this.getAttribute('index')));
    });
    buttonContainer.append(newTile);
  }
  selectedTileId = 'btn' + highlighted;
  selectedTile = document.getElementById(selectedTileId);
  selectedTile.classList.add("selected");
}

function shuffle() {
  let minShuffles = 100;
  let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

  for (let i = minShuffles; i <= totalShuffles; i++) {
    setTimeout(function timer() {
      let x = Math.floor(Math.random() * 4);
      let direction = 0;
      if (x == 0) {
        direction = highlighted + 1;
      } else if (x == 1) {
        direction = highlighted - 1;
      } else if (x == 2) {
        direction = highlighted + size;
      } else if (x == 3) {
        direction = highlighted - size;
      }
      swap(direction);
      if (i >= totalShuffles - 1) {
        shuffled = true;
      }
    }, i * 10);
  }
}

// Swap tiles 
function swap(clicked) {
  if (clicked < 1 || clicked > (numberOfTiles)) {
    return;
  }

  // Check if we are trying to swap right
  if (clicked == highlighted + 1) {
    if (clicked % size != 1) {
      setSelected(clicked);
    }
    // Check if we are trying to swap left
  } else if (clicked == highlighted - 1) {
    if (clicked % size != 0) {
      setSelected(clicked);
    }
    // Check if we are trying to swap up
  } else if (clicked == highlighted + size) {
    setSelected(clicked);
    // Check if we are trying to swap down 
  } else if (clicked == highlighted - size) {
    setSelected(clicked);
  }

  if (shuffled) {
    if (checkHasWon()) {
      showSuccessPopup();
    }
  }
}

function checkHasWon() {
  for (let b = 1; b <= numberOfTiles; b++) {
    currentTile = document.getElementById(`btn${b}`);
    currentTileIndex = currentTile.getAttribute('index');
    currentTileValue = currentTile.innerHTML;
    if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
      return false;
    }
  }
  return true;
}

function setSelected(index) {
  currentTile = document.getElementById(`btn${highlighted}`);
  currentTileText = currentTile.innerHTML;
  currentTile.classList.remove('selected');
  newTile = document.getElementById(`btn${index}`);
  currentTile.innerHTML = newTile.innerHTML;
  newTile.innerHTML = currentTileText;
  newTile.classList.add("selected");
  highlighted = index;
}


// Form submission
for (let i = 1; i <= numberOfForms; i++) {
  const formId = `form${i}`;
  const form = document.getElementById(formId);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const answer = document.getElementById(`answer${i}`).value.toLowerCase();
    
    if (answer === formAnswers[formId]) {
      // const userId = localStorage.getItem('userId');
      // var t;
      database.ref(`users/${userId}/level`).set(tt);
      tt++;
      currentForm++;
      form.style.display = "none";
      if (currentForm <= numberOfForms) {
        document.getElementById(`img${currentForm}`).click();
      }
      // Update user's age in Firebase Realtime Database
      // const userId = firebase.auth().currentUser.uid;
      
    } else {
      alert("Incorrect answer, please try again");
    }
  });

  const togglePara = document.getElementById(`toggle-para${i}`);
  const hiddenPara = document.getElementById(`hidden-para${i}`);

  togglePara.addEventListener('click', () => {
    if (hiddenPara.style.display === 'none') {
      hiddenPara.style.display = 'block';
      togglePara.textContent = 'Hide Clues';
    } else {
      hiddenPara.style.display = 'none';
      togglePara.textContent = 'Show Clues';
    }
  });
}

// Success popup
function showSuccessPopup() {
  alert('U have found the Dwaraka the lost golden city ');
  location.reload();
}

window.addEventListener('beforeunload', function(e) {
// Cancel the event
e.preventDefault();
// Chrome requires returnValue to be set
e.returnValue = '';

// Show the reload authentication modal
var modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = '<div class="modal-content"><h2>Reload Authentication</h2><p>Do you want to reload this page?</p><button class="reload">Reload</button><button class="continue">Continue</button></div>';
document.body.appendChild(modal);

// Add event listeners to the buttons
var reloadButton = modal.querySelector('.reload');
reloadButton.addEventListener('click', function() {
// Reload the page
location.reload();
});

var continueButton = modal.querySelector('.continue');
continueButton.addEventListener('click', function() {
// Close the modal
modal.remove();
});
});

function logg(){
  window.location.replace('index.html');
}