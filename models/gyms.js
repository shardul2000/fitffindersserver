const { dynamoClient } = require("../dynamo");

const TABLE_NAME='gyms';

const getGymListings = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const gyms = await dynamoClient.scan(params).promise();
    return gyms;
};

const getGymDetails = async (data) => {
    const params = {
        TableName: TABLE_NAME,
        Key : {
            name : data
        }
    };
    const details = await dynamoClient.get(params).promise();
    return details;
};

const createGymListing = async(data) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            ...data
        }
    };
    const res= await dynamoClient.put(params).promise();
    return res;
};

module.exports = { getGymListings, getGymDetails, createGymListing}