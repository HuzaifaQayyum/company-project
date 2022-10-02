const router = require('express').Router();
const { signup, login } = require('./auth.controller');
const { loginValidator, signupValidator } = require('./auth.validator');

router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/api/signup', signupValidator, signup);
router.post('/api/login', loginValidator, login);

module.exports = router;