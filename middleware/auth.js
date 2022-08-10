const { cognitoExpress } = require('../verifyjwt');
const jwt = require("jsonwebtoken");

const middleware = async(req,res,next) => {
 
    let token = req.headers.authorization;

    console.log("token is      "+token)
    if (!token){
        let err = new Error('You are Not Authenticated!');
        err.status = 401;
        return next(err);
    }
    cognitoExpress.validate(token, function(err, response) {

		if (err){
            let error = new Error('You are Not authorized!');
            error.status=401
            return next(error);
            // res.status(401).send(err);
        }
		res.user = response;
		next();
	});

}

module.exports={middleware}