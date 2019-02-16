const validator = require('validator');
const isEmpty = require('./is_empty');

const validateRegisterInput = data => {
   let errors = {};
   const {
      name,
      email,
      password,
      password2
   } = data;

   if (isEmpty(name)) {
      errors.name = 'Name field is required';
   } else {
      if (!validator.isLength(name, {
            min: 2,
            max: 30
         })) {
         errors.name = 'Name must be between 2 and 30 character';
      }
   }

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

   if (isEmpty(password2)) {
      errors.password2 = 'Confirm password field is required';
   } else {
      if (!validator.equals(password, password2)) {
         errors.password2 = 'Password must match';
      }
   }



   return {
      errors,
      isValid: isEmpty(errors)
   }
}

module.exports = validateRegisterInput;