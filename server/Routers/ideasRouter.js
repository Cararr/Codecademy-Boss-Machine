const express = require('express');
const dataBase = require('../db.js');
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, rex, next, ideaId) => {
	if (dataBase.getFromDatabaseById('ideas', ideaId)) {
		req.ideaId = ideaId;
		next();
	} else {
		next(dataBase.createError('wrong id!', 404));
	}
});

ideasRouter.get('/', (req, res) => {
	res.send(dataBase.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res) => {
	res.send(dataBase.getFromDatabaseById('ideas', req.ideaId));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
	const idea = dataBase.addToDatabase('ideas', req.body);
	if (idea) {
		res.status(201).send(idea);
	} else {
		next(dataBase.createError('wrong idea infos!', 400));
	}
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
	res.send(dataBase.updateInstanceInDatabase('ideas', req.body));
});

ideasRouter.delete('/:ideaId', (req, res) => {
	if (dataBase.deleteFromDatabasebyId('ideas', req.ideaId)) {
		res.status(204).send();
	} else {
		console.log('something went wrong!');
	}
});

module.exports = ideasRouter;
