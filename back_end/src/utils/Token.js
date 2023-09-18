

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createAccessToken = async (id,email,password) => {
    let token = await jwt.sign({
        id: id,
        email: email,
        password: password,
    },
        process.env.JWT_KEY,
    {
        expiresIn: '60s',
    }
    )
}

module.exports = {
    createAccessToken: createAccessToken,
}