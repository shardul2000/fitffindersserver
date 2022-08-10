const { dynamoClient } = require("../dynamo");

const TABLE_NAME='reviewList';

const createReview = async (data) => {
    data.timestamp=Number(new Date()); 
    const params = {
        TableName: TABLE_NAME,
        Item:{
            ...data
        }
    };
    const res= await dynamoClient.put(params).promise();
    return res;
};

const getReviews = async(data) => {

    const params = {
        ExpressionAttributeValues: {
            ":id": data
             
           }, 
           IndexName:"userId-index",
           KeyConditionExpression: "userId= :id", 
           TableName: TABLE_NAME,
           ScanIndexForward: true
    };
    const res = await dynamoClient.query(params).promise();
    return res.Items;
    
}

module.exports = { createReview, getReviews }