const { dynamoClient } = require("../dynamo");

const TABLE_NAME='users';

const getUsers = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    return characters;
};

const addData = async (data) => {
    const params = {
        TableName: TABLE_NAME,
        Item:{
            ...data
        }
    };
    const res= await dynamoClient.put(params).promise();
    return res;
};

const getItem = async(data) => {

    const params = {
        TableName: TABLE_NAME,
        Key : {
            userId : data
        }
    };
    const res = await dynamoClient.get(params).promise()
    return res;
}

module.exports = { getUsers, addData, getItem }