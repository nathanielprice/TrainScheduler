
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
var frequency = 0;

$("button").on("click", function (event) {

    event.preventDefault();

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
    $("form")[0].reset();
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // store everything into a variable ----------------------------------------
    var nextArr;
    var minAway;
    var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm)").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainNew), "minuets");
    var remainder = diffTime % childSnapshot.val().frequency;
    var minAway = childSnapshot.val().frequency - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $("#add-row").append("<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" + nextTrain + 
        "</td><td>" + minAway + "</td></tr>");

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").html(snapshot.val().name);
        $("#email-display").html(snapshot.val().email);
        $("#age-display").html(snapshot.val().age);
        $("#comment-display").html(snapshot.val().comment);
    });





