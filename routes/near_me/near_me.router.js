const router = require('express').Router()
const { fetchNearbyUsers } = require('./near_me.controller');
const { nearMeValidator } = require('./near_me.validator');
const jwtValidatorMiddleware = require('../../middlewares/jwt_validator.middleware');
const isLoggedInMiddleware = require('../../middlewares/is-loggedin.middleware');


router.get('/api/:distance',jwtValidatorMiddleware, isLoggedInMiddleware, nearMeValidator, fetchNearbyUsers)
router.get('', (req, res) => res.render('near-me'))

module.exports = router;