const express = require('express');
const router = express.Router();

const db = require('../config/db');
const User = require('../models/User');

router.get('/', (req, res) => {
	res.send('Hello from API');
});

router.post('/register', (req, res) => {
	let user = new User(req.body);
	user.save((error, registeredUser) => {
		if (error) {
			console.log(error);
		} else {
			res.status(200).send(registeredUser);
		}
	});
});

module.exports = router;
