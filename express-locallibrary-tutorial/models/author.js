var mongoose = require('mongoose');
// Date formatting library
const { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxlength: 100 },
	family_name: { type: String, required: true, maxlength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date }
});

// Virtual (property) for author's full name
AuthorSchema.virtual('name').get(function() {
	return this.family_name + ', ' + this.first_name;
});

// Virtual (property) for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
	return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual (property) for author's URL
AuthorSchema.virtual('url').get(function() {
	return '/catalog/author/' + this._id;
});

// Virtual for author's span of life
AuthorSchema.virtual('span_of_life').get(function() {
	var birth, death, retval;

	// Set birth and death strings
	birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
	death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';

	// Set return string based on available info
	if (!birth & !death) {
		retval = 'Lifespan unknown';
	} else if (birth) {
		retval = birth + ' - unknown';
	} else if (death) {
		retval = 'uknown - ' + death;
	} else {
		retval = birth + ' - ' + death;
	}
	return retval;
});

// Export model (schema)
module.exports = mongoose.model('Author', AuthorSchema);
