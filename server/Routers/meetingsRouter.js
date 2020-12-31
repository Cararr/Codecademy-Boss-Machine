const express = require('express');
const meetingsRouter = express.Router();
const dataBase = require('../db.js');

meetingsRouter.get('/', (req, res) => {
	res.send(dataBase.getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res) => {
	const newMeeting = dataBase.createMeeting();
	dataBase.addToDatabase('meetings', newMeeting);
	res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res) => {
	dataBase.deleteAllFromDatabase('meetings');
	res.status(204).send();
});

module.exports = meetingsRouter;
