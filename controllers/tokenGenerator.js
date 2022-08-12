const jwt = require("jsonwebtoken");
require('dotenv');

const tokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5d"})
}

module.exports = { tokenGenerator }