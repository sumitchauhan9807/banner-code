const Joi = require("@hapi/joi");




const ackOrder = Joi.object({
  orderId: Joi.string().required(),
});

const updateBannerPrices = Joi.object({
  bannerPrices: Joi.object().required(),
});

const verifyPayment = Joi.object({
  orderId: Joi.string().required(),
  paymentAmount:Joi.string().required()
});

const addPreviousBanner = Joi.object({
  name: Joi.string().required(),
});
const addPreviousBannerImage = Joi.object({
  id: Joi.string().required(),
});


const createLogisticsOrder = Joi.object({
  orderId: Joi.string().required(),

  fullname: Joi.string().required(),
  phonenumber: Joi.string().required(),
  cellPhonenumber: Joi.string().required(),
  email: Joi.string().required(),
  paymentOption:Joi.string().valid('cash_on_delivery','ecpay').required(),
  deliveryMethod:Joi.string().valid('home','pickup').required(),
  ReceiverAddress:Joi.string().when('deliveryMethod',{is:'home',then:Joi.required()}),
  ReceiverZipCode:Joi.string().length(3).when('deliveryMethod',{is:'home',then:Joi.required()}),
  LogisticsSubType:Joi.string().valid('POST','TCAT').required(),
});


module.exports = {
  ackOrder,
  createLogisticsOrder,
  verifyPayment,
  updateBannerPrices,
  addPreviousBanner,
  addPreviousBannerImage
}