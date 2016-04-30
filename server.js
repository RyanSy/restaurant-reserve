// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// Reservations (DATA)
// =============================================================
var tableData = [

	{
		customerName: "ryan",
		phoneNumber: 2018675309,
		customerEmail: "ry@ryan.com",
		customerID: 101,
	}

];

waitlistData = [

	{
		customerName: "ryan",
		phoneNumber: 2018675309,
		customerEmail: "ry@ryan.com",
		customerID: 101,
	}

];

// Routes
// =============================================================

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/home.html')); //directory name - constant set up by express; __dirname = folder this app is in
});

app.get('/tables', function(req, res){
	res.sendFile(path.join(__dirname + '/tables.html')); //directory name - constant set up by express; __dirname = folder this app is in
});

app.get('/reserve', function(req, res){
	res.sendFile(path.join(__dirname + '/reserve.html')); //directory name - constant set up by express; __dirname = folder this app is in
});

app.post('/api/tables', function(req, res){
	res.sendFile(path.join(__dirname + '/api/tables'));

	console.log(req.body);
	// req.body hosts is equal to the JSON post sent from the user
	var newTable = req.body;

	// We then add the json the user sent to the character array
	if (tableData.length<=5){
	tableData.push(newTable);
	}

	console.log(tableData);
	// We then display the JSON to the users
	res.json(newTable);
});

app.post('/api/waitlist', function(req, res){

	console.log(req.body);
	// req.body hosts is equal to the JSON post sent from the user
	var newTable2 = req.body;

	// We then add the json the user sent to the character array
	if (tableData.length>5){
	waitlistData.push(newTable2);
	}
	// We then display the JSON to the users
	res.json(newTable2);
});

app.get('/api/tables', function(req, res){
	res.json(tableData);
	});

app.get('/reserve', function(req, res){
	res.json(waitlistData);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
});
