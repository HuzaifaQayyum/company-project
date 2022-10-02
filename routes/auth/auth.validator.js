const { body } = require('express-validator');

const loginValidator = [ 
    body('username')
        .trim()

        .notEmpty()
        .withMessage('Username shouldn\'t be empty')

        .isLength({ min: 3, max: 100 })
        .withMessage('Username must be minimum 3 and max 100.')
        
        .matches(/^[A-Za-z0-9_]*$/)
        .withMessage('Username can only be digits, numbers and underscores.'),

    body('password')
        .trim()

        .notEmpty()
        .withMessage('Password is required')

        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
]

const signupValidator = [ 
    ...loginValidator,

    body('coordinates')
        .trim()

        .isLatLong()
        .withMessage('Invalid Coordinates received.')

        .customSanitizer(value => value.split(',').map(e => Number(e.trim())))
]

module.exports = { loginValidator, signupValidator }