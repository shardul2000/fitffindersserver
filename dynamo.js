const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3= new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});


const dynamoClient = new AWS.DynamoDB.DocumentClient();


module.exports = {
    dynamoClient, s3
};