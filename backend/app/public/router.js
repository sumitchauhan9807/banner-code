const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const adminControllwe = require('../admin/controller')

router.get('/banner-images',Controller.getAllBannerImages)
router.get('/banner-prices',Controller.getBannerPrices)
router.get('/site-data',adminControllwe.getSiteData)











module.exports = router;
