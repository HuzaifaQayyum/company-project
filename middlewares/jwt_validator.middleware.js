const { expressjwt: jwt_validator} = require('express-jwt');
const { developmentJWTSecret } = require('../constants');

module.exports = jwt_validator({ 
    secret: process.env.JWT_SECRET,
    algorithms: [ 'HS256' ]
});

