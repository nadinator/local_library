// Import mongoose
var mongoose = require('mongoose');

// Simplify Schema object use
var Schema = mongoose.Schema;

// Create genre schema
var GenreSchema = new Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 100 }
});

// Virtual for genre's url
GenreSchema.virtual('url').get(function() {
	return '/catalog/genre/' + this._id;
});

// Export module
module.exports = mongoose.model('Genre', GenreSchema);
