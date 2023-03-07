const jwt = require("jsonwebtoken");

expireDays = 30

function generateAccessToken(userId) {
    return jwt.sign({
        id: userId.toString()
    }, process.env.JWT_SECRET, { expiresIn: expireDays + ' days' });
}

function expireTime() {
    const date = new Date();
    return date.setDate(date.getDate() + expireDays);
}

module.exports = {
    generateAccessToken,
    expireTime
}