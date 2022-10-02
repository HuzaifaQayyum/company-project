const router = require('express').Router();
const { fetchWeather } = require('./weather.controller');
const jwtValidatorMiddleware = require('../../middlewares/jwt_validator.middleware');
const isLoggedInMiddleware = require('../../middlewares/is-loggedin.middleware');

router.get('/api', jwtValidatorMiddleware, isLoggedInMiddleware, fetchWeather);

router.get('', (req, res) => res.render('weather'));

module.exports = router;