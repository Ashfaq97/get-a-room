const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

console.log(process.env.AWS_DEFAULT_REGION)

const dynamoClient = new AWS.DynamoDB.DocumentClient()

const Table = 'rooms'

// POST rooms
const createOrUpdate = async (room) => {

    const params = {
        TableName: Table,
        Item: room,
        ReturnValues: "ALL_OLD"
    }

    return await dynamoClient.put(params).promise();

}

// GET rooms
const readAllRooms = async() =>{
    const params = {
        TableName: Table
    }

    const allRooms = await dynamoClient.scan(params).promise();
    return allRooms;

}

// GET room
const getRoomById = async (id) => {
    const params = {
        TableName: Table,
        Key: {
            id,
        }
    }

    return await dynamoClient.get(params).promise();

}

// DELETE room by ID
const deleteRoomById = async(id) => { 
    const params = {
        TableName: Table,
        Key: {
            id
        }
    }

    return await dynamoClient.delete(params).promise();

}


module.exports = {
    dynamoClient,
    createOrUpdate,
    readAllRooms,
    getRoomById,
    deleteRoomById
}