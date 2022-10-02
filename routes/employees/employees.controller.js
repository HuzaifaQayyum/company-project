const Employee = require('../../models/Employee');
const { validationResult } = require('express-validator');
const { get_base_url } = require('../../constants');


exports.createEmployee = async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).render('create-employee', { errors: errors.mapped() })


    const { name, salary} = req.body;

    const employee = new Employee({ name, salary  });
    await employee.save();

    return res.status(201).redirect(get_base_url(req));
};


exports.getEmployees = async (req, res) => { 
    const employees = await Employee.aggregate([
        { $set: { 
            tax:  { $round: [ { $divide: [  { $multiply: [ '$salary', 4 ] }, 100 ]  }]  } }
         }
    ]);
    
    return res.render('index', { employees })
};

exports.getDeleteEmployee = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.redirect(get_base_url(req));

    const { _id } = req.params;
    const employee = await Employee.findOne({ _id });
    if (!employee)
        return res.redirect(get_base_url(req));

    return res.render('delete-employee', { employee });
}

exports.deleteEmployee = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.redirect(get_base_url(req));

    const { _id } = req.params;
    const employee = await Employee.findOne({ _id });
    if (employee)
        await employee.delete();

    return res.redirect(get_base_url(req));  
};

exports.getUpdateEmployee = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.redirect(get_base_url(req));
        
    const { _id } = req.params;
    const employee = await Employee.findOne({ _id });
    if (!employee)
        return res.redirect(get_base_url(req));

    return res.render('update-employee', { employee });
};


exports.updateEmployee = async (req, res) => { 
    const { _id } = req.params;
    const employee = await Employee.findOne({ _id });
    const errors = validationResult(req);

    if (!employee)
        return res.redirect(get_base_url(req));

    if (!errors.isEmpty())
        return res.render('update-employee', { employee, errors: errors.mapped() });

    const { salary } = req.body;

    if (employee && salary != employee.salary) {
        employee.salary = salary;
        if (salary > employee.maxSalary)
            employee.maxSalary = salary;
        else
            employee.minSalary = salary;

        await employee.save()
    }

    return res.redirect(get_base_url(req));
}