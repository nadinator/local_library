var express = require('express');
var router = express.Router();

/* GET home page. */
// '/' is the url path
// function is a callback that gets invoked "if an HTTP GET request with the path is received."
router.get('/', function(req, res, next) {
	res.redirect('/catalog');
	/*
	 * Note: This is our first use of the redirect() response method. 
	 * This redirects to the specified page, by default sending HTTP status code "302 Found". 
	 * You can change the status code returned if needed, and supply either absolute or relative paths. 
	 */
	// this is a middleware, so if we were not completing the
	// chain as we are now, we would have called next()
});

module.exports = router;
