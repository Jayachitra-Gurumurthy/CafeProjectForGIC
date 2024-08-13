const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  PhoneNumber: String,
  CafeName:String,
  DaysWorked:String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;