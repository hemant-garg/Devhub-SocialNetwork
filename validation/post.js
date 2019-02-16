const validator = require('validator');
const isEmpty = require('./is_empty');

const validatePostInput = data => {
 let errors = {};
 const {
  text
 } = data;


 if (isEmpty(text)) {
  errors.text = 'Text field is required';
 } else {
  if (!validator.isLength(text, {
    min: 6,
    max: 300
   })) {
   errors.text = 'Post must be between 6 and 300 character';
  }
 }


 return {
  errors,
  isValid: isEmpty(errors)
 }
}

module.exports = validatePostInput;