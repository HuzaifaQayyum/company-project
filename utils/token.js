const jwt = require('jsonwebtoken');

exports.generateJwtToken = (payload, validTill) => { 
    return jwt.sign({...payload, validTill: new Date().getTime() + validTill }, process.env.JWT_SECRET, { expiresIn: validTill.toString() })
};