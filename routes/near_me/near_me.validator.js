const { param } = require('express-validator');

exports.nearMeValidator = [ 
    param('distance')
        .trim()

        .custom((value) => {
            if (isNaN(value)) throw new Error(`Distance must be a number`);

            if (value % 1 !== 0) throw new Error(`Distance should not be float value`);

            if (value <= 0) throw new Error(`Distance must be greater than 0`);

            return true;
        })
        .toInt(),
]