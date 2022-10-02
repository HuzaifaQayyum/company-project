const { body, param } = require('express-validator');




exports.employeeIDValidator = [ 
    param('_id')
        .isMongoId()
        .withMessage('Invalid Object ID.')
]

exports.updateEmployeeValidator = updateEmployeeValidator = [ 
    body('salary')
        .trim()

        .notEmpty()
        .withMessage('Salary can not be empty.')

        .custom((value) => {
            if (isNaN(value)) throw new Error(`salary must be a number`);

            if (value % 1 !== 0) throw new Error(`salary should not be float value`);

            if (value <= 0) throw new Error(`salary must be greater than 0`);

            return true;
        })
        .toInt()
]


exports.createEmployeeValidator = [ 
    body('name')
        .trim()

        .notEmpty()
        .withMessage('Name is required.')

        .isLength({ min: 3 })
        .withMessage('Name must be of at least 3 characters.'),

    ...updateEmployeeValidator
];