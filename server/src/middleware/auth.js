const jwt = require('jsonwebtoken');

/* This is the secret used to verify the jwt token */
const SECRET_KEY = 's3cr3tk3333y';

/* This middleware is used to verify the jwt token */
const authenticateJwt = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, SECRET_KEY, (err, user) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};

module.exports = { authenticateJwt, SECRET_KEY };
