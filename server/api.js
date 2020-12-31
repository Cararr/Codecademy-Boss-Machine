const express = require('express');
const minionRouter = require('./Routers/minionRouter.js');
const apiRouter = express.Router();
const ideasRouter = require('./Routers/ideasRouter.js');
const meetingsRouter = require('./Routers/meetingsRouter.js');

// Route minions
apiRouter.use('/minions', minionRouter);
// Route ideas
apiRouter.use('/ideas', ideasRouter);
// Route meetings
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
