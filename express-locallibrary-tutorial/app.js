// Import dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog'); //Import routes for "catalog" area of site

var app = express();

// Set up mongoose (database) connection
/* 
 * As discussed in the Mongoose primer (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose), 
 * this code creates the default connection to the database and binds to the error event (so that errors will 
 * be printed to the console). 
 */
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://nboualwa:midan2470@cluster0.yvf2p.mongodb.net/local_library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// View engine setup
/* There are two parts to setting up the engine. First, 
we set the 'views' value to specify the folder where the 
templates will be stored(in this case the subfolder / views).
Then we set the 'view engine' value to specify the template 
library(in this case "pug"). */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add middleware libraries into request-handling chain
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, 'public'))); // serve all static files in the 'public' dir
// add routers into chain
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
