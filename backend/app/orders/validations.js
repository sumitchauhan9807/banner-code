const Joi = require("@hapi/joi");

const createOrderSchema = Joi.object({
  fullname: Joi.string().max(15).required(),
  email: Joi.string().required(),
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
  cellPhonenumber: Joi.number().min(10000000).max(99999999).required().messages({
    'number.min':'請填入有效的手機後8碼',
    'number.max':'請填入有效的手機後8碼',
    'number.required':'請填入有效的手機後8碼',
  }),
  deliveryMethod: Joi.string().required().valid('pickup','home'),
  paymentOption :Joi.string().required().valid('cash_on_delivery','ecpay'),
  quantity: Joi.number().max(500).min(1).required().messages({
    'number.min':'訂單數量不得超過500',
    'number.max':'訂單數量不得超過500',
    'number.required':'訂單數量不得超過500',
  }),
  // address: Joi.string().required(),
  bannerData: Joi.object().required(),
  zipCode :Joi.string().when('deliveryMethod',{is:'home',then:Joi.required()}),
  deliveryAddress :Joi.string().when('deliveryMethod',{is:'home',then:Joi.required()}),
});

const ecPaySchema = Joi.object({
  orderId: Joi.string().required(),
});

const pdfPreviewSchema = Joi.object({
  orderId: Joi.string().required(),
});


const setupPickupStore = Joi.object({
  orderId: Joi.string().required(),
  store:Joi.string().required().valid('FAMIC2C','UNIMARTC2C','HILIFEC2C','OKMARTC2C')
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
  ecPaySchema,
  pdfPreviewSchema,
  setupPickupStore
}