const validator = require('validator');
const isEmpty = require('./is_empty');

const validateEducationInput = data => {
 let errors = {};
 const {
  school,
  degree,
  fieldofstudy,
  from,
  to,
  current
 } = data;


 if (isEmpty(school)) {
  errors.school = 'School field is required';
 }

 if (isEmpty(degree)) {
  errors.degree = 'Degree field is required';
 }

 if (isEmpty(fieldofstudy)) {
  errors.fieldofstudy = 'Field of study is required';
 }


 if (isEmpty(from)) {
  errors.from = 'From Date field is required';
 }

 if (!current) {
  if (isEmpty(to)) {
   errors.to = 'To Date field is required';
  }
 }


 return {
  errors,
  isValid: isEmpty(errors)
 }
}

module.exports = validateEducationInput;