const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../config/db');
const User = require('../models/User');

router.get('/', (req, res) => {
	res.send('Hello from API');
});

// User register
router.post('/register', (req, res) => {
	let user = new User(req.body);
	user.save((error, registeredUser) => {
		if (error) {
			console.log(error);
		} else {
			let payload = { subject: registeredUser._id };
			let token = jwt.sign(payload, 'secretKey');
			res.status(200).send({ token });
		}
	});
});

// User login
router.post('/login', (req, res) => {
	let { email, password } = req.body;
	User.findOne({ email }, (error, user) => {
		if (error) {
			console.log(error);
		} else {
			if (!user) {
				res.status(401).send('Invalid email');
			} else {
				if (user.password !== password) {
					res.status(401).send('Invalid password');
				} else {
					let payload = { subject: user._id };
					let token = jwt.sign(payload, 'secretKey');
					res.status(200).send({ token });
				}
			}
		}
	});
});

// Verify Token Middleware
function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send('Unauthorized request');
	}
	let token = req.headers.authorization.split(' ')[1];
	if (token === 'null') {
		return res.status(401).send('Unauthorized request');
	}
	let payload = jwt.verify(token, 'secretKey');
	if (!payload) {
		return res.status(401).send('Unauthorized request');
	}
	req.userId = payload.subject;
	next();
}

// Events
router.get('/events', (req, res) => {
	let events = [
		{
			_id: '1',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '2',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '3',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '4',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '5',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '6',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
	];
	res.status(200).json(events);
});

// Special events
router.get('/special', verifyToken, (req, res) => {
	let events = [
		{
			_id: '1',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '2',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '3',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
		{
			_id: '4',
			name: 'Auto Expo',
			description: 'lorem ipsum',
			date: '2021-04-23T18:25:43.511Z',
		},
	];
	res.status(200).json(events);
});

module.exports = router;
