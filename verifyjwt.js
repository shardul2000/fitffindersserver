const CognitoExpress = require("cognito-express");
const cognitoExpress = new CognitoExpress({
	region: "us-east-1",
	cognitoUserPoolId: "us-east-1_HbvJ4FD4H",
	tokenUse: "id", 
	tokenExpiration: 3600000 ,
	
});

module.exports={
    cognitoExpress
}