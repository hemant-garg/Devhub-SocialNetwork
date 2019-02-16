const validator = require('validator');
const isEmpty = require('./is_empty');

const validateExperienceInput = data => {
 let errors = {};
 const {
  title,
  company,
  from,
  to,
  current
 } = data;


 if (isEmpty(title)) {
  errors.title = 'Title field is required';
 }

 if (isEmpty(company)) {
  errors.company = 'Company field is required';
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

module.exports = validateExperienceInput;