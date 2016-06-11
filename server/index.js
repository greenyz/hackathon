var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//------Firebase Setup------
var firebase = require("firebase");
// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: "https://project1-b73a5.firebaseio.com/",
  serviceAccount: "serviceAcc.json"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

console.log('Listening on port 3000');
app.listen(3000);
