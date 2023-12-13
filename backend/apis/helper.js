const jwt = require("jsonwebtoken");

function isUserVerified(req, owner) {
    const username = req.cookies.username;

    if (!username) {
        return false;
    }
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, process.env.JWT_SECRET);
    } catch (e) {
        return false;
    }

    if (decryptedUsername != owner) {
        return false;
    }
    return true;
}

exports.isUserVerified = isUserVerified;