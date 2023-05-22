class AuthMiddleware {
    ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403);
            res.send("Error: Invalid/Missing Auth Token");
        }
    }
    parseJwt = (token) => {
        try {
            return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        } catch (e) {
            return null;
        }
    };
}

module.exports = new AuthMiddleware();