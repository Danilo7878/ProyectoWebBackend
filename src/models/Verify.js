const jwt = require('jsonwebtoken');

//middleware to verify the jwt authorization and decode the user id to get data in private requests
module.exports = (req, res, next) => {
    try{
        //if (!req.headers.authorization) return res.status(401).json({error: "Unauthorized Request"})
        const token = req.headers.authorization.split(" ")[1]; //Because the Bearer describer of the token
        const decoded = jwt.verify(token, "secretkey");
        req.userId =  decoded;
        next();
    }catch(err){
        res.status(401).json({
            error: "Autentication failed"
        });
    }
}