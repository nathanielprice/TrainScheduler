
// Config for Firebase -----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCHS1WcHjA7_KV0ZkoSWT8TBNJkL8oSqRw",
    authDomain: "train-scheduler-e76ab.firebaseapp.com",
    databaseURL: "https://train-scheduler-e76ab.firebaseio.com",
    projectId: "train-scheduler-e76ab",
    storageBucket: "train-scheduler-e76ab.appspot.com",
    messagingSenderId: "935812991495",
    appId: "1:935812991495:web:ae60bb8af9eb4d46d1f8a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);   

// variables to reference the database --------------------------
var database = firebase.database();

// variables for the onclick event ------------------------------
var name;
var destination;
var firstTrain;
var frequency;

$("button").on("click", function (event) {

    event.PreventDefault();

    // Storage of the new train data ---------------------------------
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();
    
    // pushing to the database ---------------------------------------
    database.ref().push({ 
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
})


