const jwt = require("jsonwebtoken");
const JWT_SECRET = "souravmalviya";

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    try {
        const response = jwt.verify(token, JWT_SECRET);

        if (response) {
            req.userId = response.id;
            next();
        } else {
            res.status(403).json({
                message: "Incorrect creds"
            })
        }
    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}
