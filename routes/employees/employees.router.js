const router = require('express').Router();
const { createEmployeeValidator, employeeIDValidator, updateEmployeeValidator } = require('./employees.validator');
const { createEmployee, getEmployees, getDeleteEmployee, deleteEmployee, getUpdateEmployee, updateEmployee } = require('./employees.controller');


router.get('/create', (req, res) => res.render('create-employee'));
router.post('/create', createEmployeeValidator, createEmployee);
router.get('/update/:_id', employeeIDValidator, getUpdateEmployee);
router.post('/update/:_id', employeeIDValidator, updateEmployeeValidator, updateEmployee);
router.get('/delete/:_id', employeeIDValidator, getDeleteEmployee);
router.get('/delete/:_id/confirm', employeeIDValidator, deleteEmployee);

router.get('', getEmployees);

module.exports = router;