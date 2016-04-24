const express = require( 'express' );
const feathers = require( 'feathers' );
const memory = require('feathers-memory');
const rest = require( 'feathers-rest' );
const bodyParser = require( 'body-parser' );

const app = feathers();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

// Static hosting of React-UI
app.use( feathers.static( 'www' ) );

// Feathers REST API Confignpm
app.configure( rest() );

app.use('/users', memory());

// Error Handling
app.use( function ( err, req, res, next ) {
	res.status( 500 ).send( err );
});

app.listen( process.env.PORT || 8000 );

