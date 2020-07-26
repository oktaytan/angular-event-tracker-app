const mongoose = require('mongoose');

module.exports = mongoose.connect(
	'mongodb://localhost:27017/eventsdb',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log('Error: ' + err);
		} else {
			console.log('Connected to mongoDB');
		}
	}
);
