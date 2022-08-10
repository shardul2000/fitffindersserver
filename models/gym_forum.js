const { dynamoClient } = require("../dynamo");

const TABLE_NAME='gym_forum';

const createPost = async (data) => {
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

const getPosts = async(data) => {

    const params = {
        ExpressionAttributeValues: {
            ":vname": data
             
           }, 
           IndexName:"gymName-index",
           KeyConditionExpression: "gymName= :vname", 
           TableName: TABLE_NAME,
           ScanIndexForward: true
    };
    const res = await dynamoClient.query(params).promise();
    return res;
    
}


module.exports ={ createPost, getPosts
}