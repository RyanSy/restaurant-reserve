// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1111',
	database: 'restaurantreservations'
	});
// Sets up the Express app to handle data parsing

connection.connect(function(err){
    if(err){
        console.log("Not Connected")
        console.log("error: "+ err)
        return;
    }else{
        console.log("Connected")
    };
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// Reservations (DATA)
// =============================================================
var tableData = [
];

waitlistData = [
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

	connection.query("INSERT INTO customers (customer_name,customer_email,phone_number) VALUES ('"+req.body.customerName+"','"+req.body.customerEmail+"','"+req.body.phoneNumber+"');", function (err, res) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(res);
		}
	});

	connection.query("INSERT INTO reservations (customer_id) VALUES ('"+req.body.customerID+"');", function (err, res) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(res);
		}
	});

	connection.query("INSERT INTO waitings (customer_id) VALUES ('"+req.body.customerID+"');", function (err, res) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(res);
		}
	});

	// req.body hosts is equal to the JSON post sent from the user
	var newTable = req.body;

	// We then add the json the user sent to the character array
	if (tableData.length<=4){
	tableData.push(newTable);
	}
	else {
		waitlistData.push(newTable);

	}

	//console.log(tableData);
	// We then display the JSON to the users
	res.json(newTable);
});

app.post('/api/waitlist', function(req, res){

	console.log(req.body.customerID);
	// req.body hosts is equal to the JSON post sent from the user
	var newTable2 = req.body;

	// We then add the json the user sent to the character array
//We then display the JSON to the users
	res.json(newTable2);
});

app.get('/api/tables', function(req, res){
	res.json(tableData);
	});

app.get('/api/waitlist', function(req, res){
	res.json(waitlistData);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
});
