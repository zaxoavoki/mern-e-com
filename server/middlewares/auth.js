const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: "You do not have permissions." });
    }

    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong" });
        }

        req.user = decoded;
        next();
    });
};
