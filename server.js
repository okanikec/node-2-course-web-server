//require express
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//set connecting port variable for heroku or local machine
const port = process.env.PORT || 3000; //process.env is an object that stores 
// your computers enviroment variables as key value pairs

var app = express();

// handlebars: sets up reuseable code across webpages
hbs.registerPartials(__dirname + '/views/partials');

//sets up view engine folder and displays hbs files in it
app.set('view engine','hbs');



//middleware that lets us keep track of how our server is working
app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
console.log(log);
//fs append lets u add to a file server log, prints each request in a new line in the file and returns error
//message if it cannot connect to the file
fs.appendFile('server log', log + '\n', (err) => {
	if(err){console.log('Unable to append to server log')}
})
//next makes you move on to the rest of the program
next();
});


//maintenance middleware that stops page from rendering
/*app.use((req, res, next)=> {
	res.render('maintenance.hbs');
});*/

//takes middleware function 'express.static' which takes absolute path to /public; '/' represents node-web-server directory
app.use(express.static(__dirname + '/public'));


//function returns current year
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
	//return 'test';
});

//
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/',(req,res) => {
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage: 'Welcome to my website'
		});

});


//about page with callbacks:request & response
app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle:'About Page'
		});
});

//
app.get('/projects',(req,res) => {
	res.render('projects.hbs',{
					pageTitle: 'Projects'
					});
});


//bad request - send back json with error message
app.get('/bad',(req,res) => {
res.send({ errorMessage:'Unable to handle request' });
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});