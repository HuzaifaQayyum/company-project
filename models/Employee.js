const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    salary: { type: Number, default: 0 },
    maxSalary: { type: Number, default: function() { 
        return this.salary;
    }},
    minSalary: { type: Number, default: function() { return this.salary } }
})

module.exports = model('employees', EmployeeSchema)