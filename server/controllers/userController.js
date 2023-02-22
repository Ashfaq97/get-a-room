const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const Table = 'users'

// POST users || CREATE user
const createOrUpdateUser = async (user) => {

    const params = {
        TableName: Table,
        Item: user,
        ReturnValues: "ALL_OLD"
    }

    return await dynamoClient.put(params).promise();

}


module.exports = {
    dynamoClient,
    createOrUpdateUser
}
