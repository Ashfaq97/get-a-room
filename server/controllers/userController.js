const AWS = require('aws-sdk');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// AWS.config.update({
//     region: process.env.AWS_DEFAULT_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

// const dynamoClient = new AWS.DynamoDB.DocumentClient()
// const Table = 'users'

const bcryptSalt = bcrypt.genSalt(10);

// POST users || CREATE user

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const userDoc = await User.create({
        name, 
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    })

    res.json(userDoc);
}


// const createOrUpdateUser = async (user) => {

//     const params = {
//         TableName: Table,
//         Item: user,
//         ReturnValues: "ALL_OLD"
//     }

//     return await dynamoClient.put(params).promise();

// }


module.exports = {
    createUser
}
