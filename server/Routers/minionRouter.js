const express = require('express');
const dataBase = require('../db.js');
const minionWorkRouter = require('./minionWorkRouter.js');
const minionRouter = express.Router();

minionRouter.param('minionId', (req, res, next, minionId) => {
	if (dataBase.getFromDatabaseById('minions', minionId)) {
		req.minionId = minionId;
		next();
	} else {
		next(dataBase.createError('wrong id!', 404));
	}
});

minionRouter.get('/', (req, res) => {
	res.send(dataBase.getAllFromDatabase('minions'));
});

minionRouter.get('/:minionId', (req, res) => {
	res.send(dataBase.getFromDatabaseById('minions', req.minionId));
});

minionRouter.post('/', (req, res, next) => {
	const minion = dataBase.addToDatabase('minions', req.body);
	if (minion) {
		res.status(201).send(minion);
	} else {
		next(dataBase.createError('wrong minion info!', 400));
	}
});

minionRouter.put('/:minionId', (req, res) => {
	res.send(dataBase.updateInstanceInDatabase('minions', req.body));
});

minionRouter.delete('/:minionId', (req, res) => {
	if (dataBase.deleteFromDatabasebyId('minions', req.minionId)) {
		res.status(204).send();
	} else {
		console.log('Something went wrong!');
	}
});

minionRouter.use('/:minionId/work', minionWorkRouter);

module.exports = minionRouter;
