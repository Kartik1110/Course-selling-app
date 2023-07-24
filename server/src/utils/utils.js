const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/auth');

/* This function is used to generate a jwt token */
function generateJwt(user) {
	const payload = { username: user.username, role: user.role };

	return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
	generateJwt,
};
