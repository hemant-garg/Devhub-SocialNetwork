const validator = require('validator');
const isEmpty = require('./is_empty');

const validateLoginInput = data => {
   let errors = {};
   const {
      email,
      password
   } = data;


   if (isEmpty(email)) {
      errors.email = 'Email field is required';
   } else {
      if (!validator.isEmail(email)) {
         errors.email = 'Email must be valid';
      }
   }

   if (isEmpty(password)) {
      errors.password = 'Password field is required';
   } else {
      if (!validator.isLength(password, {
            min: 6,
            max: 30
         })) {
         errors.password = 'Password must be between 6 and 30 character';
      }
   }


   return {
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateLoginInput;