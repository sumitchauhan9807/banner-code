const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const { ackOrder , createLogisticsOrder ,verifyPayment ,updateBannerPrices ,addPreviousBanner ,addPreviousBannerImage }  = require('./validations')

const upload = require("../../utils/upload").upload
var multipleUpload = upload.single("file");


router.get('/all-orders',Controller.getAllOrders)
router.get('/all-orders-custom',Controller.getCustomAllOrders)


router.post('/acknowledge-order',(req, res, next) => {
  const validator = ackOrder.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.acknowledgeOrder)

router.post('/create-logistics-order',(req, res, next) => {
  const validator = createLogisticsOrder.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.createLogisticsOrder)

router.post('/print-fami-order-info',(req, res, next) => {
  const validator = ackOrder.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.printFamiOrderInfo)

router.post('/print-trade-document',(req, res, next) => {
  const validator = ackOrder.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.printTradeDocumentInfo)

router.put('/verify-payment',(req, res, next) => {
  const validator = verifyPayment.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.verifyPayment)

// banner image
router.delete('/banner-image/:name',Controller.deleteBannerImage)
router.get('/banner-images',Controller.getAllBannerImages)


router.post('/add-banner-image',function(req,res,next){
  multipleUpload(req,res,function(err){
    if(err) {
      console.log(err)
       return  res.status(500).json({
        message:'File extension is not correct'
      })
    }else{
      next()
    }
  })
},Controller.addBannerImage)

// unit prices

router.post('/update-banner-prices',(req, res, next) => {
  const validator = updateBannerPrices.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.updateBannerPrices)

router.get('/banner-prices',Controller.getBannerPrices)

// site data

router.get('/site-data',Controller.getSiteData)
router.post('/edit-site-data',function(req,res,next){
  multipleUpload(req,res,function(err){
    if(err) {
      console.log(err)
       return  res.status(500).json({
        message:'File extension is not correct'
      })
    }else{
      next()
    }
  })
},Controller.editSiteData)

router.post('/add-previous-banner',(req, res, next) => {
  const validator = addPreviousBanner.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.addPreviousBanner)

router.get('/get-previous-banner',Controller.getPreviousBanners)

router.post('/add-previous-banner-image',function(req,res,next){
  multipleUpload(req,res,function(err){
    if(err) {
      console.log(err)
       return  res.status(500).json({
        message:'File extension is not correct'
      })
    }else{
      next()
    }
  })
},Controller.addPreviousBannerImage)


router.post('/delete-previous-banner-image/:name',Controller.deletePreviousBannerImage)
router.delete('/delete-previous-banner/:id',Controller.deletePreviousBanner)

router.delete('/equipment-image/:name',Controller.deleteEquipmentImage)
router.delete('/service-image/:name',Controller.deleteServiceImage)
router.delete('/form-image/:name',Controller.deleteFormImage)
router.delete('/company-image/:name',Controller.deleteCompanyImage)




router.put('/previous-banner-text/:id',Controller.updateBannerText)

//equipment-image










module.exports = router;
