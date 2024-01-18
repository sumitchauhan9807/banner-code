const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const { createOrderSchema , ecPaySchema ,pdfPreviewSchema ,setupPickupStore }  = require('./validations')

router.post('/',(req, res, next) => {
  console.log(req.body)
  const validator = createOrderSchema.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.createOrder)

// router.get('/',Controller.getAll)
router.get('/download-pdf/:id',Controller.sendPdf)

router.get('/:id',Controller.getOrder)
router.get('/custom/:id',Controller.getCustomOrder)


router.post('/webhook',Controller.handlePaymentSuccess)
router.post('/setup-pickup-hook',Controller.handleStorePickupHook)
router.post('/create-order-logistics-hook',Controller.handleCreateLogisticsHook)

router.post('/ecpay',(req, res, next) => {
  const validator = ecPaySchema.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.paymentForm)

router.post('/pdf-preview',(req, res, next) => {
  const validator = pdfPreviewSchema.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.pdfPreview)

router.post('/logi',Controller.logiTest)
router.post('/setup-pickup-store',(req, res, next) => {
  const validator = setupPickupStore.validate(req.body, { errors: { wrap: { label: '' } } });
  validator.error ? res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 }) : next();
},Controller.setupPickupStore)
router.post('/printinfo',Controller.printinfo)
router.post('/orderlogi',Controller.addOrderLogisticsInfo)










module.exports = router;
