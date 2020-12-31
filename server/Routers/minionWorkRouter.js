const express = require('express');
const dataBase = require('../db.js');
const minionWorkRouter = express.Router();

minionWorkRouter.param('workId', (req, res, next, workId) => {
	if (dataBase.getFromDatabaseById('work', workId)) {
		req.workId = workId;
		next();
	} else {
		next(dataBase.createError('invalid work id!', 404));
	}
});

minionWorkRouter.get('/', (req, res) => {
	res.send(dataBase.createArrayOfWork(req.minionId));
});

minionWorkRouter.put('/:workId', (req, res) => {
	dataBase.getFromDatabaseById('minions', req.body.minionId)
		? res.send(dataBase.updateInstanceInDatabase('work', req.body))
		: res.status(400).send();
});

minionWorkRouter.post('/', (req, res) => {
	dataBase.addToDatabase('work', req.body)
		? res.status(201).send(req.body)
		: next(dataBase.createError('wrong work infos!', 400));
});

minionWorkRouter.delete('/:workId', (req, res) => {
	if (dataBase.deleteFromDatabasebyId('work', req.workId))
		res.status(204).send();
});

module.exports = minionWorkRouter;
