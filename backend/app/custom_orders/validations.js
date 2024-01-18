const Joi = require("@hapi/joi");

const createOrderSchema = Joi.object({
  fullname: Joi.string().max(15).required(),
  email: Joi.string().required(),
  customizationDetails:Joi.string().required(),
  phonenumber: Joi.string().required().custom((value, helper) => {
    if (value.length < 8) {
      return helper.message("手機號碼尚需填入8碼");
    }
    if (value.length > 20) {
      return helper.message("號碼不得超過20個數字");
    }
    let allAlphabets = 'abcdefghijklmnopqrstuvwxyz '
    let allSpecialChars = getAllSpecialChars('()-#')
    let notAllowedChars = allAlphabets.concat(allSpecialChars)
    let isValidated =  validateString(value,notAllowedChars)
    if(!isValidated){
      return helper.message(value+ " 此號碼非有效電話號碼");
    }
  }),
  deliveryMethod: Joi.string().required().valid('pickup','home'),
  deliveryAddress :Joi.string().when('deliveryMethod',{is:'home',then:Joi.required()}),
  zipCode :Joi.string().when('deliveryMethod',{is:'home',then:Joi.required()}),
});

function validateString(str,notAllowedChars) {
  let charsArray = Array.from(notAllowedChars)
  let valueArray = Array.from(str)
  let isValidated = true  
  valueArray.forEach((val)=>{
      if(charsArray.includes(val)){
        isValidated = false 
      }
  })
  console.log(charsArray)
  return isValidated
  console.log(charsArray)
}

function getAllSpecialChars(exclude) {
  let chars = '`~!@#$^&%*()+=-_[]\/{}|:;<>?,.'
  chars = chars.concat("'");
  chars = chars.concat('"');
  if(exclude){
    let excludeArray = Array.from(exclude)
    excludeArray.forEach((ex)=>{
      chars = chars.replace(ex,'')
    })
  }
  return chars
}
module.exports = {
  createOrderSchema,
}