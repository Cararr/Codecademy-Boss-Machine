const checkMillionDollarIdea = (req, res, next) => {
	if (validateIdea(req.body.numWeeks, req.body.weeklyRevenue)) {
		next();
	} else {
		res.status(400).send();
	}
};

function validateIdea(numWeeks, weeklyIncome) {
	if (
		!isNaN(Number(weeklyIncome)) &&
		!isNaN(Number(numWeeks)) &&
		Number(weeklyIncome) * Number(numWeeks) >= 1000000
	) {
		return true;
	} else {
		return false;
	}
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
